import axios from 'axios';
import apiURL from '../constants/urls';
import { authService } from './auth.service';

export const axiosService = axios.create({ baseURL: apiURL });

export const errorInterceptor = (axiosInstance: any) => {
  axiosInstance.interceptors.response.use(
    (response: any) => {
      return response;
    },
    async (error: any) => {
      const originalConfig = error.config;
      if (error.response.data.statusCode === 401) {
        originalConfig._retry = true;
        const refresh = (await localStorage.getItem('refresh')) as string;
        const { data: tokenPair } = await authService.refresh(refresh);
        localStorage.setItem('access', tokenPair.accessToken);
        localStorage.setItem('refresh', tokenPair.refreshToken);
        return axiosService(originalConfig);
      }
    },
  );
};

export const updateHeaderInterceptor = (axiosInstance: any) => {
  axiosInstance.interceptors.request.use((request: any) => {
    const access = localStorage.getItem('access');
    request.headers = {
      Authorization: ` Bearer ${access}`,
    };
    return request;
  });
};

errorInterceptor(axiosService);
updateHeaderInterceptor(axiosService);

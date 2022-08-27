import { IUser } from '../interfaces';
import { axiosService } from './axios.service';
import { urls } from '../constants';

export const userService = {
  getAllUsers: () => axiosService.get<IUser[]>(urls.user),
  getUserById: (id: string) => axiosService.get<IUser>(urls.user + `/${id}`),
  getUserByToken: (accessToken: string) =>
    axiosService.get<IUser>(urls.user + '/currentUser' + `/${accessToken}`),
  getFrequentOrderByUserId: (userId: string) =>
    axiosService.get<number[]>(urls.frequentOrder + `/${userId}`),
};

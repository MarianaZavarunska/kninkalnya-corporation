import { axiosService } from './axios.service';
import { ILocality } from '../interfaces';
import { urls } from '../constants';

export const localityService = {
  getLocality: () => axiosService.get<ILocality[]>(urls.locality),
};

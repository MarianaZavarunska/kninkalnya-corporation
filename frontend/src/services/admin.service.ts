import { axiosService } from './axios.service';
import { urls } from '../constants';
import { IDish, ILocality } from '../interfaces';
import { IRestaurant } from '../interfaces/restaurant.interface';

export const adminService = {
  addDish: (data: FormData) =>
    axiosService.post<IDish>('admin' + urls.dish, data),
  updateDish: (data: Partial<IDish>) =>
    axiosService.put<IDish>('admin' + urls.dish, data),
  deleteDish: (id: string) =>
    axiosService.delete<IDish>('admin' + urls.dish + `${id}`),

  addLocality: (data: FormData) =>
    axiosService.post<ILocality>('admin' + urls.locality, data),
  updateLocality: (id: string, data: Partial<ILocality>) =>
    axiosService.put<ILocality>('admin' + urls.locality + `${id}`, data),
  deleteLocality: (id: string) =>
    axiosService.delete<ILocality>('admin' + urls.locality + `${id}`),

  addRestaurant: (data: FormData) =>
    axiosService.post<IRestaurant>('admin' + urls.restaurants, data),
  getRestaurantByID: (id: string) =>
    axiosService.get<IRestaurant>(urls.restaurants + id),
  updateRestaurant: (id: string, data: Partial<IRestaurant>) =>
    axiosService.put<IRestaurant>('admin' + urls.restaurants + `${id}`, data),

  addPromotion: (data: FormData) =>
    axiosService.post<FormData>(urls.promotions, data),
};

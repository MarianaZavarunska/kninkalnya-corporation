import { urls } from '../constants';
import { axiosService } from './axios.service';
import { IRestaurant } from '../interfaces/restaurant.interface';

export const restaurantService = {
  getRestaurants: () => axiosService.get<IRestaurant[]>(urls.restaurants),
  getRestaurantsByCity: (city: string) =>
    axiosService.get<IRestaurant[]>(urls.restaurants + `/city/${city}`),
  getAllCity: () =>
    axiosService.get<{ city: string }[]>(urls.restaurants + '/get/cities'),
};

import { axiosService } from './axios.service';
import { IPromotion } from '../interfaces/promotion.interface';
import { urls } from '../constants';

export const promotionsService = {
  getPromotions: () => axiosService.get<IPromotion[]>(urls.promotions),
};

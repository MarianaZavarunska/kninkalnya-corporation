import { axiosService } from './axios.service';

import { urls } from '../constants';
import { IReview } from '../interfaces';

export const reviewService = {
  GetAllReviews: () => axiosService.get<IReview[]>(urls.reviews),
  CreateReview: (review: Partial<IReview>) =>
    axiosService.post<IReview>(urls.reviews, review),
};

import { IUser } from './user.interface';
import { IRestaurant } from './restaurant.interface';

export interface IReview {
  id: number;
  body: string;
  restaurantId: number;
  userId: number;
  user?: IUser;
  restaurant?: IRestaurant;
  createdAt: string;
  rating: number;
}

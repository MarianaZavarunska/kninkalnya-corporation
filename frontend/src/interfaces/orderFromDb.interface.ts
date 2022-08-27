import { IOrder } from './order.interface';

export interface IOrderFromDbInterface {
  dish: number[];
  id?: number;
  restaurantId?: number;
  totalPrice: number;
  userId: number;
}
export interface ISaveOrder {
  userId: number;
  totalPrice: number;
  dish: IOrder[];
}

import { IDish } from './dish.interface';

export interface IOrder {
  dish: IDish;
  quantity: number;
}

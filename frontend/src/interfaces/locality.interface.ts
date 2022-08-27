import { IDish } from './dish.interface';

export interface ILocality {
  id: number;
  name: string;
  image?: any;
  Dish?: IDish[];
}

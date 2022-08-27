export interface IDish {
  id: number;
  image: any;
  name: string;
  price: number;
  weight: number;
  description: string;
  quantity_sold?: number;
  locality: string | Blob;
  localityId: never;
  restaurantId: never;
  ingredients?: [];
  order?: [];
  Restaurant: string;
}

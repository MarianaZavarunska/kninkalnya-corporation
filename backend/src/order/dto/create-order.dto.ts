export interface CreateOrderDto {
  userId: number;
  totalPrice: number;
  dish: createDishOrderDto[];
}

export interface createDishOrderDto {
  dish: {
    id: number;
  };
  quantity: number;
}

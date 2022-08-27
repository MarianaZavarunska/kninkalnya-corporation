import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { getAllDishes, getAllOrders } from '../../store';
import { IDish } from '../../interfaces';

const OrderDone = () => {
  const { orderFromDb } = useAppSelector((state) => state.orderReducer);
  const { dishes } = useAppSelector((state) => state.dishReducer);
  const dispatch = useAppDispatch();
  let [total] = useState(0);
  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllDishes());
  }, [dispatch]);

  const arrayOrder: { productId: number; quantity: number }[] = [];
  const count = {} as number[];
  if (orderFromDb.dish) {
    for (const elem of orderFromDb.dish) {
      if (count[elem] === undefined) {
        count[elem] = 1;
      } else {
        count[elem]++;
      }
    }
  }
  for (const countElement in count) {
    const order = {
      productId: +countElement,
      quantity: +count[countElement],
    };
    arrayOrder.push(order);
  }
  const PRODUCTS_MAP = dishes.reduce(
    (acc: { [key: string]: IDish }, product) => {
      acc[product.id] = product;
      return acc;
    },
    {},
  );
  return (
    <div>
      {arrayOrder.map((value) => {
        const product = PRODUCTS_MAP[value.productId];
        const price = product?.price || 0;
        const number = value.quantity * price;
        total += number;
        return (
          <div key={value.productId}>
            <div>{product?.name}</div>
            <div>{`${value.quantity} x $${price} = $${number}`}</div>
          </div>
        );
      })}
      Разом: <div>{total}</div>
      <h2>OrderDone</h2>
    </div>
  );
};

export { OrderDone };

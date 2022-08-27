import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  dec,
  inc,
  removeItem,
  saveOrderInDb,
} from '../../store/slices/order.slice';
import { IOrder } from '../../interfaces/order.interface';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@mui/material';

const Cart = () => {
  const { orders } = useAppSelector((state) => state.orderReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let totalPrice = 0;
  const userId = localStorage.getItem('userId');

  const item = localStorage.getItem('order');
  const dishFromCart = JSON.parse(item as string) as IOrder[];
  const submit = async () => {
    await dispatch(
      saveOrderInDb({
        userId: Number(userId),
        totalPrice: Number(totalPrice),
        dish: arrDishId,
      }),
    );
    navigate('/cart/orderDone');
  };

  const arrDishId: IOrder[] = [];
  if (dishFromCart) {
    for (const iDish of dishFromCart) {
      totalPrice += iDish.dish.price * iDish.quantity;
      arrDishId.push(iDish);
    }
  } else {
    return <h1>Полистай щось замов</h1>;
  }
  return (
    <div>
      {dishFromCart.map((value, index) => (
        <div key={index}>
          <h4>{value.dish.name}</h4>
          <span>{value.dish.price}</span>* <span>{value.quantity}</span>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={() => dispatch(inc(value))}>+</Button>
            <Button onClick={() => dispatch(dec(value))}>-</Button>
            <Button onClick={() => dispatch(removeItem(value))}>x</Button>
            sum: <span>{value.dish.price * value.quantity}</span>
          </ButtonGroup>
        </div>
      ))}

      <h4>Сума замовлення-{totalPrice}</h4>

      <button onClick={() => submit()}>Оформи Замовлення</button>
    </div>
  );
};

export { Cart };

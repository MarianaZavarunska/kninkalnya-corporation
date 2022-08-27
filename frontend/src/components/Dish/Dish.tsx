import React, { FC, useState } from 'react';

import { IDish } from '../../interfaces';
import { useAppDispatch } from '../../hooks/redux';
import { createOrder } from '../../store';

const Dish: FC<{ results: IDish }> = ({ results }) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const order = {
    dish: results,
    quantity: quantity,
  };

  return (
    <div>
      <img width={'220px'} src={`${results.image}`} alt="dish" />
      <div>{results.name}</div>
      <div style={{ display: 'flex' }}>
        <div>{results.weight}грам</div>
        <div>{results.price}грн</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button
          style={{ height: '30px' }}
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
        <h1>{order.quantity >= 1 ? order.quantity : 1}</h1>
        <button
          style={{ height: '30px' }}
          onClick={() => setQuantity(quantity - 1)}
        >
          -
        </button>
      </div>
      <button onClick={() => dispatch(createOrder(order))}>
        Добавити в корзину
      </button>
    </div>
  );
};

export { Dish };

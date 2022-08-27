import React, { FC, useState } from 'react';
import { Avatar, Card } from 'antd';

import { IDish } from '../../interfaces';
import { createOrder } from '../../store';
import { useAppDispatch } from '../../hooks/redux';
import './DishCard.css';

const { Meta } = Card;

const DishCard: FC<{ dish: IDish }> = ({ dish }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const order = {
    dish: dish,
    quantity: quantity,
  };

  return (
    <Card
      key={dish.id}
      style={{ width: 300 }}
      cover={<img alt="example" src={dish.image} />}
      actions={[
        <button onClick={() => dispatch(createOrder(order))}>
          Додати до замовлення
        </button>,
      ]}
    >
      <Meta
        avatar={<Avatar src={dish.image} />}
        title={dish.name}
        description={
          <div className={'dish-description'}>
            <p>{dish.description}</p>
            <div className={'dish-info'}>
              <span>{dish.weight}г.</span>
              <span>{dish.price}грн.</span>
            </div>
            <div className={'btn-servings'}>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
              <h1>{order.quantity >= 1 ? order.quantity : 1}</h1>
              <button onClick={() => setQuantity(quantity - 1)}>-</button>
            </div>
          </div>
        }
      />
    </Card>
  );
};

export { DishCard };

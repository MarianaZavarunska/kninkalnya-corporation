import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllDishes } from '../../store';
import { DishCard } from '../DishCard/DishCard';
import './DishesCardsList.css';

const DishesCardsList: FC = () => {
  const { dishes } = useAppSelector((state) => state.dishReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllDishes());
  }, [dispatch]);

  return (
    <>
      <h1 className={'ant-list-header'} id={'dishes'}>
        Зробити замовлення?
      </h1>
      <div className={'dishes-container'}>
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </>
  );
};

export { DishesCardsList };

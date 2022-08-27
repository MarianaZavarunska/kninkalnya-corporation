import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getAllDishByLocalityId } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Dish } from '../Dish/Dish';
import Loader from '../Loader/Loader';

const DishList: FC = () => {
  const { result, status, item } = useAppSelector((state) => state.dishReducer);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getAllDishByLocalityId(id));
    }
  }, [id, item, dispatch]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {status === 'Loading' && <Loader />}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {result &&
          status === 'fulfilled' &&
          result.map((results) => <Dish key={results.id} results={results} />)}
      </div>
    </div>
  );
};

export { DishList };

import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { TextField } from '@mui/material';

import { addDish, getLocality, getRestaurants } from '../../store';
import { IDish } from '../../interfaces';
import './AddDish.css';
import { AddLocality } from '../AddLocality/AddLocality';
import { AddRestaurant } from '../AddRestautant/AddRestaurant';
import { AddPromotions } from '../AddPromotions/AddPromotions';

const AddDish: FC = () => {
  const { locality } = useAppSelector((state) => state.localityReducer);
  const { restaurants } = useAppSelector((state) => state.restaurantReducer);
  const { register, handleSubmit } = useForm();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLocality());
    dispatch(getRestaurants());
  }, [dispatch]);

  const submit: any = async (data: IDish) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('name', data.name);
    formData.append('price', data.price.toString());
    formData.append('weight', data.weight.toString());
    formData.append('description', data.description);
    formData.append('localityId', data.localityId);
    formData.append('restaurantId', data.restaurantId);
    await dispatch(addDish(formData));
  };

  return (
    <div>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '10px',
        }}
        onSubmit={handleSubmit(submit)}
      >
        <h3>Додати Страву</h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <div>Фото Страви</div>
            <input
              style={{ margin: '10px' }}
              className={'file'}
              type="file"
              {...register('image')}
            />
          </div>
          <div>
            <input
              style={{ margin: '10px' }}
              type="text"
              placeholder={'name'}
              {...register('name')}
            />
          </div>
          <div>
            <input
              style={{ margin: '10px' }}
              type="number"
              placeholder={'price'}
              {...register('price')}
            />
          </div>
          <div>
            <input
              style={{ margin: '10px' }}
              type="number"
              placeholder={'weight'}
              {...register('weight')}
            />
          </div>
          <div>
            <TextField
              style={{ margin: '10px' }}
              id="outlined-multiline-static"
              label="Текст Опису"
              multiline
              rows={4}
              {...register('description')}
            />
          </div>
          <select style={{ margin: '10px' }} {...register('localityId')}>
            <option value="">Виберіть цех приготування</option>
            {locality &&
              locality.map((result) => (
                <option key={result.id} value={result.id}>
                  {result.name}
                </option>
              ))}
          </select>

          <select style={{ margin: '10px' }} {...register('restaurantId')}>
            <option value="">Виберіть ресторан</option>
            {restaurants &&
              restaurants.map((result) => (
                <option key={result.id} value={result.id}>
                  {result.name}
                </option>
              ))}
          </select>
          <div>
            <button>Добавити Страву</button>
          </div>
        </div>
      </form>
      <h1>Додати цех приготування</h1>
      <AddLocality />
      <h1>Додати Ресторан</h1>
      <AddRestaurant />
      <h1>Додати Акцію</h1>
      <AddPromotions />
    </div>
  );
};

export { AddDish };

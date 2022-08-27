import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { useForm } from 'react-hook-form';
import { addRestaurant } from '../../store';
import { IRestaurant } from '../../interfaces/restaurant.interface';

const AddRestaurant = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();

  const submit: any = async (data: IRestaurant) => {
    const formData = new FormData();
    data.image && formData.append('image', data.image[0]);
    formData.append('name', data.name);
    formData.append('city', data.name);
    formData.append('address', data.name);
    await dispatch(addRestaurant(formData));
  };
  return (
    <div>
      Додати ресторан
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <input type="file" {...register('image')} />
        </div>
        <div>
          <input type="text" placeholder={'name'} {...register('name')} />
        </div>
        <div>
          <input type="text" placeholder={'city'} {...register('city')} />
        </div>
        <div>
          <input type="text" placeholder={'address'} {...register('address')} />
        </div>
        <button> Додати страву</button>
      </form>
    </div>
  );
};

export { AddRestaurant };

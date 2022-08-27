import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { addPromotion } from '../../store';
import { IPromotion } from '../../interfaces/promotion.interface';
import { useAppDispatch } from '../../hooks/redux';
import { TextField } from '@mui/material';

const AddPromotions: FC = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm();
  const submit: any = async (data: IPromotion) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);
    formData.append('descriptions', data.descriptions);
    await dispatch(addPromotion(formData));
  };
  return (
    <div>
      Add Promotions
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <input type="file" {...register('image')} />
        </div>
        <div>
          <TextField
            style={{ margin: '10px' }}
            id="outlined-multiline-static"
            label="Текст Акції"
            multiline
            rows={4}
          />
        </div>
        <button>Додати акцію</button>
      </form>
    </div>
  );
};

export { AddPromotions };

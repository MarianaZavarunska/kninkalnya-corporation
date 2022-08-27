import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { IUser } from '../../../interfaces';
import { useAppDispatch } from '../../../hooks/redux';
import { userRegistration } from '../../../store';
import './UserRegistrtion.css';

const UserRegistration: FC = () => {
  const { register, handleSubmit } = useForm<IUser>();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');

  const onSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmitForm = async (data: IUser) => {
    data.password = password;
    await dispatch(userRegistration(data));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitForm)} className="signUp-form">
        <div className={'signUp-content'}>
          <label>Ім'я</label>
          <input type="text" {...register('name')} />
        </div>

        <div className={'signUp-content'}>
          <label>Пошта</label>
          <input type="text" {...register('email')} />
        </div>

        <div className={'signUp-content'}>
          <label>Вік</label>
          <input type="number" {...register('age')} />
        </div>

        <div className={'signUp-content'}>
          <label>Місто</label>
          <input type="text" {...register('city')} />
        </div>

        <div className={'signUp-content'}>
          <label>Пароль</label>
          <Input.Password
            {...register('password')}
            onChange={onSetPassword}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <div className="btn-container">
          <button>Зареєструватись</button>
        </div>
      </form>
    </div>
  );
};

export { UserRegistration };

import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getUserById } from '../../store';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { getLocality } from '../../store/slices/locality.slice';

const Admin: FC = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const role = localStorage.getItem('role');
  useEffect(() => {
    const id = localStorage.getItem('userId');
    dispatch(getLocality());
    if (id) dispatch(getUserById(id));
  }, []);

  const { locality } = useAppSelector((state) => state.localityReducer);
  const array: number[] = [];

  for (let i = 0; i < locality.length; i++) {
    const datum = locality[i];
    if (datum.Dish) {
      const a = datum.Dish.length;
      array.push(a);
    }
  }
  console.log(array);

  return (
    <div style={{ display: 'flex' }}>
      {role === 'user' && <h1>Тіки Адмін</h1>}
      {role === 'admin' && user && (
        <div>
          <Avatar sx={{ background: deepOrange[500], width: 150, height: 150 }}>
            {user.name}
          </Avatar>
          <img src={user.avatar} alt="" />
          <h1>{user.name}</h1>
          <p> тел:{user.phone}</p>
          <p> вік:{user.age}</p>
          <p> email:{user.email}</p>
          <p> місто:{user.city}</p>
          <p> адреса:{user.address}</p>
        </div>
      )}
      <div>
        <button>Users</button>
        <button>Orders</button>
        <button>Many</button>
      </div>
    </div>
  );
};

export { Admin };

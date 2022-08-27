/* eslint-disable react/jsx-no-undef */
import React from 'react';
import 'antd/dist/antd.css';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import {
  Admin,
  About,
  AddDish,
  LayoutComponent,
  Main,
  UserLogin,
  UserRegistration,
  Users,
  Cart,
  DishList,
  DeliveryInfo,
  OrderDone,
  Restaurants,
  Promotions,
} from './components';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<LayoutComponent />}>
        <Route path={'*'} element={<Main />}></Route>
        <Route path={'/main'} element={<Main />}></Route>
        <Route
          path={'/auth/registration'}
          element={<UserRegistration />}
        ></Route>
        <Route path={'/auth/login'} element={<UserLogin />}></Route>
        <Route path={'/admin/AddDish'} element={<AddDish />}></Route>
        <Route path={'/admin'} element={<Admin />}></Route>
        <Route path={'/users'} element={<Users />}></Route>
        <Route path={'/dish/:id'} element={<DishList />}></Route>
        <Route path={'/cart'} element={<Cart />}></Route>
        <Route path={'/cart/orderDone'} element={<OrderDone />}></Route>
        <Route path={'/delivery'} element={<DeliveryInfo />}></Route>
        <Route path={'/about'} element={<About />}></Route>
        <Route path={'/promotions'} element={<Promotions />}></Route>
        <Route path={'/restaurants'} element={<Restaurants />}></Route>
      </Route>
    </Routes>
  );
}
export default App;

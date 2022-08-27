import { Avatar, List, Select } from 'antd';
import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  getAllCities,
  getRestaurants,
  getRestaurantsByCity,
} from '../../store';
import './Restaurants.css';

const { Option } = Select;

const Restaurants: FC = () => {
  const { restaurants, cities } = useAppSelector(
    (state) => state.restaurantReducer,
  );
  const dispatch = useAppDispatch();
  const [city, setCity] = useState('');

  useEffect(() => {
    if (city === '' || city === 'all') {
      dispatch(getRestaurants());
    } else {
      dispatch(getRestaurantsByCity(city));
    }
    dispatch(getAllCities());
  }, [city, dispatch]);

  const onChange = (value: string) => {
    setCity(value);
  };

  return (
    <section className={'restaurants-list'}>
      <h3>Виберіть місто</h3>
      <Select defaultValue="all" style={{ width: 200 }} onChange={onChange}>
        <Option value={'all'}>Всі міста</Option>
        {cities &&
          cities.map((result, index) => (
            <Option key={index} value={result.city}>
              {result.city}
            </Option>
          ))}
      </Select>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={restaurants}
        renderItem={(item) => (
          <List.Item
            key={item.name}
            extra={<img width={420} alt={item.name} src={item.image} />}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              description={item.name}
            />
            <h4>
              м.{item.city} {item.address}
            </h4>
          </List.Item>
        )}
      />
    </section>
  );
};

export { Restaurants };

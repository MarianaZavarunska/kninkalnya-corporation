import React, { FC, useEffect } from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import './Main.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getPromotions } from '../../store';
import { ReviewsList } from '../ReviewsList/ReviewsList';
import { DishesCardsList } from '../DishesCardsList/DishesCardsList';

const Main: FC = () => {
  const { promotion } = useAppSelector((state) => state.promotionsReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPromotions());
  }, [dispatch]);
  return (
    <div>
      <div>
        <video
          style={{ margin: 0, height: 'initial' }}
          width={'100%'}
          autoPlay
          loop
          muted
          className="video"
          src={'/video/video.mp4'}
        />

        <div className="container_button_main">
          <a href="#dishes" className="btn_main">
            Замовити
          </a>
        </div>
      </div>
      <div>
        <h1 id="prom" className={'header_promotion'}>
          Акції
        </h1>
        <hr />
        <div>
          <Carousel
            arrows
            prevArrow={<LeftOutlined />}
            nextArrow={<RightOutlined />}
            slidesPerRow={2}
            autoplay={true}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            {promotion.map((value) => (
              <div key={value.id}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    width={'300px'}
                    height={'300px'}
                    src={value.image}
                    alt=""
                  />
                  <div>{value.descriptions}</div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <hr />
      </div>
      <DishesCardsList />
      <ReviewsList />
    </div>
  );
};

export { Main };

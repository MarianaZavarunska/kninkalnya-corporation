import React, { FC, useEffect } from 'react';
import { Comment, List, Rate } from 'antd';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllReviews } from '../../store';
import './ReviewsList.css';

const ReviewsList: FC = () => {
  const { reviews } = useAppSelector((state) => state.reviewReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  return (
    <List
      className="comment-list"
      header={'Відгуки'}
      itemLayout="horizontal"
      dataSource={reviews}
      renderItem={(item) => (
        <li>
          <Comment
            author={item?.user?.name}
            avatar={'https://joeschmoe.io/api/v1/random'}
            content={
              <div className={'comment-content-wrapper'}>
                <p>{item.body}</p>
                <div>
                  <b>{item.restaurant?.name}</b>
                  <Rate disabled defaultValue={item.rating} />
                </div>
              </div>
            }
            datetime={
              `${new Date(item.createdAt).toLocaleDateString('uk-UA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}` +
              ' ' +
              `${new Date(item.createdAt).toLocaleTimeString()}`
            }
          />
        </li>
      )}
    />
  );
};

export { ReviewsList };

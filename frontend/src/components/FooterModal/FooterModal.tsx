import { FC } from 'react';
import * as React from 'react';
import { Alert } from 'antd';

import './FooterModal.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setReviewActive } from '../../store';

type Props = {
  children?: React.ReactNode;
};

const FooterModal: FC<Props> = ({ children }) => {
  const { isReviewActive } = useAppSelector((state) => state.reviewReducer);
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem('userId') as string;

  return (
    <div
      className={isReviewActive ? 'footer-modal active' : 'footer-modal'}
      onClick={() => {
        dispatch(setReviewActive());
      }}
    >
      <div
        className={
          isReviewActive
            ? 'footer-modal-content active'
            : 'footer-modal-content '
        }
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
      {!userId && (
        <Alert message="Ви не можете залишити відгук" type="error" showIcon />
      )}
    </div>
  );
};

export { FooterModal };

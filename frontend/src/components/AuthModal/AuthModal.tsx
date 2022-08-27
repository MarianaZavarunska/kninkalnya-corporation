import { FC } from 'react';
import * as React from 'react';

import './AuthModal.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setModalActive } from '../../store';

type Props = {
  children?: React.ReactNode;
};

const AuthModal: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isRegisterActive, isLoginActive } = useAppSelector(
    (state) => state.authReducer,
  );

  return (
    <div
      className={isLoginActive || isRegisterActive ? 'modal active' : 'modal'}
      onClick={() => {
        dispatch(setModalActive());
      }}
    >
      <div
        className={
          isLoginActive || isRegisterActive
            ? 'modal-content active'
            : 'modal-content'
        }
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export { AuthModal };

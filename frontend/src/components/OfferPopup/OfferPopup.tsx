import { FC, useEffect } from 'react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import './OfferPopup.css';
import {
  getDishById,
  getFrequentOrder,
  setOfferPopupActive,
} from '../../store';

const OfferPopup: FC = () => {
  const { user } = useAppSelector((state) => state.authReducer);
  const {
    isOfferPopupActive,
    user: currentUser,
    frequentOrderId,
  } = useAppSelector((state) => state.userReducer);
  const { popularDish } = useAppSelector((state) => state.dishReducer);
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem('userId') as string;
  const frqtOrderIdLS = localStorage.getItem('frequentOrderId') as string;

  useEffect(() => {
    userId && dispatch(getFrequentOrder(userId));
    frequentOrderId && dispatch(getDishById(frequentOrderId));
    !frequentOrderId && frqtOrderIdLS && dispatch(getDishById(+frqtOrderIdLS));
  }, [userId, frequentOrderId, frqtOrderIdLS]);

  return (
    <div
      className={isOfferPopupActive ? 'offer-modal active' : 'offer-modal'}
      onClick={() => {
        dispatch(setOfferPopupActive());
      }}
    >
      <div
        className={
          isOfferPopupActive
            ? 'offer-modal-content active'
            : 'offer-modal-content '
        }
        onClick={(event) => event.stopPropagation()}
      >
        {user.name && (
          <p>
            Доброго дня, <span>{user.name}!</span>
          </p>
        )}
        {!user.name && currentUser.name && (
          <p>
            Доброго дня, <span>{currentUser.name}!</span>
          </p>
        )}
        <p>Вітаємо вас у нашому ресторані!</p>
        <p>
          Бажаєте замовити свої улюблені{' '}
          <Link
            to={`dish/${popularDish.localityId}`}
            onClick={() => dispatch(setOfferPopupActive())}
          >
            {popularDish.name}?
          </Link>
        </p>
        <img
          src={popularDish.image}
          alt={popularDish.name}
          className={'popularDish-img'}
        />
      </div>
    </div>
  );
};

export { OfferPopup };

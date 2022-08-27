import React, { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { NavHashLink } from 'react-router-hash-link';
import {
  getCurrentUser,
  getGeolocation,
  getLocality,
  getRestaurants,
  setLoginActive,
  setOfferPopupActive,
  userLogout,
} from '../../store';
import { AuthModal } from '../AuthModal/AuthModal';
import { UserLogin } from '../User/UserLogin/UserLogin';
import { UserRegistration } from '../User/UserRegistration/UserRegistration';
import { OfferPopup } from '../OfferPopup/OfferPopup';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import './Header.css';
import { IUser } from '../../interfaces';

const HeaderComponent: FC = () => {
  const dispatch = useAppDispatch();
  let currentUser: Partial<IUser>;
  const authStore = useAppSelector((state) => state.authReducer);
  const { isLoginActive, isRegisterActive } = authStore;
  currentUser = authStore.user;

  const { locality } = useAppSelector((state) => state.localityReducer);
  const { restaurants } = useAppSelector((state) => state.restaurantReducer);
  const userStore = useAppSelector((state) => state.userReducer);

  const refresh = localStorage.getItem('refresh') as string;
  const access = localStorage.getItem('access') as string;
  const frequentOrderId = localStorage.getItem('frequentOrderId') as string;

  if (!currentUser.email) currentUser = userStore.user;

  let popupTimeout: any = undefined;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRestaurants());
    dispatch(getLocality());

    access && !currentUser.name && dispatch(getCurrentUser(access));

    if (!access && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        dispatch(getGeolocation({ lat, lng }));
      });
    }

    if (currentUser.name && Number(frequentOrderId) > 0) {
      popupTimeout = setTimeout(() => {
        dispatch(setOfferPopupActive());
      }, 5000);
    }
  }, [
    refresh,
    currentUser,
    access,
    dispatch,
    currentUser.email,
    Number(frequentOrderId),
  ]);

  const handleChange = (event: SelectChangeEvent) => {
    localStorage.setItem('restaurantId', event.target.value as string);
    navigate('/main');
  };

  return (
    <header
      style={{
        background: 'white',
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        right: 0,
        zIndex: '100',
      }}
    >
      <div className={'header_menu'}>
        <div>
          <a href="/main">
            {' '}
            <img
              src="/image-for-header/logoKhinkalnya.jpg"
              width={'100px'}
              alt="logo"
            />
          </a>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <NavHashLink
            to={'/main#prom'}
            scroll={(el) =>
              el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          >
            <img
              src="/image-for-header/discount.svg"
              width={'80px'}
              height={'40px'}
              alt="promotions"
            />
          </NavHashLink>
          <div>Акції</div>
        </div>
        {locality &&
          locality.map((value) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              key={value.id}
            >
              <Link to={'/dish/' + value.id.toString()}>
                {' '}
                <img
                  src={value.image}
                  width={'80px'}
                  height={'40px'}
                  alt="locality"
                />
              </Link>
              <div>{value.name}</div>
            </div>
          ))}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Link to={'/about'}>
            <img
              src="/image-for-header/information.svg"
              width={'80px'}
              height={'40px'}
              alt="information's"
            />
          </Link>
          <div>Інформація</div>
        </div>
        <FormControl style={{ width: '250px' }}>
          <InputLabel>Виберіть ресторан</InputLabel>
          <Select defaultValue={''} onChange={handleChange}>
            {restaurants &&
              restaurants.map((result) => (
                <MenuItem key={result.id} value={result.id}>
                  {result.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <div>
          <Link to={'/cart'}>
            <img
              src="/image-for-header/cart.png"
              width={'80px'}
              height={'50px'}
              alt="cart"
            />
          </Link>
        </div>
        <div>
          <div>{currentUser && access && <div>{currentUser.name}</div>}</div>
          <button
            onClick={() => {
              !access && dispatch(setLoginActive());

              if (access) {
                dispatch(userLogout({ accessToken: access }));
                clearTimeout(popupTimeout);
              }
            }}
          >
            {!access ? 'Увійти' : 'Вийти'}
          </button>
        </div>
      </div>
      <AuthModal>
        {isLoginActive ? (
          <UserLogin />
        ) : isRegisterActive ? (
          <UserRegistration />
        ) : null}
      </AuthModal>
      <OfferPopup />
    </header>
  );
};

export { HeaderComponent };

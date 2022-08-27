import { FC } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import { setLoginActive, userGoogleLogin } from '../../../store';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

const UserGoogleLogin: FC = () => {
  const navigate = useNavigate();
  const redirectPage = process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT as string;
  const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authReducer);

  const onSuccess = async (response: CredentialResponse) => {
    try {
      await dispatch(
        userGoogleLogin({
          token: response.credential || '',
          clientId: clientId,
        }),
      );

      if (!user) {
        alert('Error while logging via Google 1');
      } else {
        dispatch(setLoginActive());
        navigate(redirectPage);
      }
    } catch (error) {
      alert('Спробуй ще раз 1!');
    }
  };

  const onFailure = () => {
    alert('Спробуй ще раз 2!');
  };

  return (
    <GoogleLogin
      type="standard"
      shape="rectangular"
      theme="filled_black"
      width={'300'}
      text="signin_with"
      onSuccess={onSuccess}
      onError={() => onFailure}
    />
  );
};

export { UserGoogleLogin };

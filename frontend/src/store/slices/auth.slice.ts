import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { decodeToken } from 'react-jwt';

import {
  IAuthResponse,
  IAuthResponseApi,
  ILogoutRequest,
  IPosition,
  ITokenData,
  IUser,
} from '../../interfaces';
import { authService } from '../../services/auth.service';
import { GoogleSignupRequest } from '../../interfaces/google-request.interface';

interface IInitialState {
  user: Partial<IUser>;
  accessToken?: string;
  refreshToken?: string;
  status?: number | string;
  isLoginActive: boolean;
  isRegisterActive: boolean;
  error: string;
}

const initialState: IInitialState = {
  user: {},
  accessToken: '',
  refreshToken: '',
  error: '',
  status: 200,
  isLoginActive: false,
  isRegisterActive: false,
};

export const userRegistration = createAsyncThunk<IAuthResponse, IUser>(
  'auth/registration',
  async (user) => {
    try {
      const response = await authService.registration(user);
      const { data, status } = response;

      return { userData: data, status: status, error: undefined };
    } catch (e) {
      return { userData: undefined, status: 401, error: `${e}` };
    }
  },
);

export const userLogin = createAsyncThunk<IAuthResponse, Partial<IUser>>(
  'auth/login',
  async (user: Partial<IUser>) => {
    try {
      const { data, status } = await authService.login(user);
      return { userData: data, status: status, error: undefined };
    } catch (error) {
      return { userData: undefined, status: 401, error: `${error}` };
    }
  },
);

export const userLogout = createAsyncThunk<void, ILogoutRequest>(
  'auth/logout',
  async ({ accessToken }) => {
    try {
      accessToken && (await authService.logout(accessToken));
    } catch (error) {
      return undefined;
    }
  },
);

export const userGoogleLogin = createAsyncThunk<
  IAuthResponseApi | undefined,
  GoogleSignupRequest
>('auth/google/login', async (response) => {
  if ('clientId' in response) {
    try {
      const apiToken = response.token || '';
      const city = localStorage.getItem('city') as string;
      const { data } = await authService.googleLogin(apiToken, city);

      return data;
    } catch (e) {
      return undefined;
    }
  } else {
    return undefined;
  }
});

export const getGeolocation = createAsyncThunk<string, IPosition>(
  'auth/geolocation',
  async (position: IPosition) => {
    try {
      const res = await authService.getGeolocation(
        position.lat.toString(),
        position.lng.toString(),
      );
      return res.data.plus_code.compound_code.replace(',', '').split(' ')[1];
    } catch (e) {
      console.log(e);
      return '';
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setModalActive: (state) => {
      state.isLoginActive = false;
      state.isRegisterActive = false;
    },

    setLoginActive: (state) => {
      state.isLoginActive = !state.isLoginActive;
    },

    setRegisterActive: (state) => {
      state.isRegisterActive = !state.isRegisterActive;
      state.isLoginActive = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      userRegistration.fulfilled,
      (state, action: PayloadAction<IAuthResponse>) => {
        const access_token = action.payload.userData?.tokenPair?.accessToken;
        const refresh_token = action.payload?.userData?.tokenPair?.refreshToken;

        state.accessToken = access_token;
        state.refreshToken = refresh_token;
        state.user = { ...action.payload?.userData?.user };
        state.status = action.payload?.status;
        state.error = action.payload.error || '';

        state.isRegisterActive = false;
        localStorage.setItem('access', access_token || '');
        localStorage.setItem('refresh', refresh_token || '');

        if (access_token != null) {
          const { role, id } = decodeToken(access_token) as ITokenData;
          localStorage.setItem('role', role);
          localStorage.setItem('userId', id);
        }
      },
    );

    builder.addCase(userLogin.pending, (state) => {
      state.status = 'Loading';
    });

    builder.addCase(
      userLogin.fulfilled,
      (state, action: PayloadAction<IAuthResponse>) => {
        const access_token = action.payload.userData?.tokenPair?.accessToken;
        const refresh_token = action.payload?.userData?.tokenPair?.refreshToken;

        state.accessToken = access_token;
        state.refreshToken = refresh_token;
        state.user = { ...action.payload?.userData?.user };
        state.status = action.payload?.status;

        state.isLoginActive = false;
        localStorage.setItem('access', access_token || '');
        localStorage.setItem('refresh', refresh_token || '');

        if (access_token != null) {
          const { role, id } = decodeToken(access_token) as ITokenData;
          localStorage.setItem('role', role);
          localStorage.setItem('userId', id);
        }
      },
    );

    builder.addCase(userLogout.fulfilled, (state) => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.user = {};
      state.status = undefined;

      localStorage.clear();
    });

    builder.addCase(
      userGoogleLogin.fulfilled,
      (state, action: PayloadAction<IAuthResponseApi | undefined>) => {
        const access_token = action.payload?.tokenPair.accessToken;
        const refresh_token = action.payload?.tokenPair.refreshToken;

        state.user = { ...action.payload?.user };
        state.accessToken = access_token;
        state.refreshToken = refresh_token;

        localStorage.setItem('access', access_token || '');
        localStorage.setItem('refresh', refresh_token || '');

        if (access_token != null) {
          const { role, id } = decodeToken(access_token) as ITokenData;
          localStorage.setItem('role', role);
          localStorage.setItem('userId', id);
        }
      },
    );

    builder.addCase(getGeolocation.fulfilled, (state, action) => {
      action.payload !== '' && localStorage.setItem('city', action.payload);
    });
  },
});

const authReducer = authSlice.reducer;
export { authReducer };
export const { setModalActive, setLoginActive, setRegisterActive } =
  authSlice.actions;

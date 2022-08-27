import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userService } from '../../services/user.service';
import { IUser } from '../../interfaces';

interface IInitialState {
  status: string;
  user: IUser;
  allUser: IUser[];
  isOfferPopupActive: boolean;
  frequentOrderId: number;
}
const initialState: IInitialState = {
  status: '',
  user: {} as IUser,
  allUser: [],
  isOfferPopupActive: false,
  frequentOrderId: 0,
};

export const getAll = createAsyncThunk<IUser[] | undefined, void>(
  'user/getAll',
  async (_) => {
    try {
      const { data } = await userService.getAllUsers();
      return data;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  },
);

export const getUserById = createAsyncThunk<IUser | undefined, string>(
  'user/getUserById',
  async (id) => {
    try {
      const { data } = await userService.getUserById(id);
      return data;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  },
);

export const getCurrentUser = createAsyncThunk<IUser | undefined, string>(
  'user/getCurrentUser',
  async (accessToken) => {
    try {
      const { data } = await userService.getUserByToken(accessToken);
      return data;
    } catch (e) {
      return undefined;
    }
  },
);

export const getFrequentOrder = createAsyncThunk<number[] | undefined, string>(
  'user/getFrequentOrder',
  async (userId: string) => {
    try {
      const { data } = await userService.getFrequentOrderByUserId(userId);
      return data;
    } catch (e) {
      return undefined;
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setOfferPopupActive: (state) => {
      state.isOfferPopupActive = !state.isOfferPopupActive;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserById.pending, (state) => {
      state.status = 'Loading';
    });
    builder.addCase(
      getUserById.fulfilled,
      (state, action: PayloadAction<IUser | undefined>) => {
        state.status = 'fulfilled';
        if (action.payload) state.user = action.payload;
      },
    );
    builder.addCase(getAll.pending, (state) => {
      state.status = 'Loading';
    });
    builder.addCase(
      getAll.fulfilled,
      (state, action: PayloadAction<IUser[] | undefined>) => {
        state.status = 'fulfilled';
        if (action.payload) state.allUser = action.payload as IUser[];
      },
    );
    builder.addCase(
      getCurrentUser.fulfilled,
      (state, action: PayloadAction<IUser | undefined>) => {
        state.status = 'fulfilled';
        if (action.payload) {
          state.user = action.payload;
        }
      },
    );

    builder.addCase(
      getFrequentOrder.fulfilled,
      (state, action: PayloadAction<number[] | undefined>) => {
        state.status = 'fulfilled';
        let max_count = 1,
          res = 0;
        let curr_count = 1;

        if (action.payload) {
          action.payload = action.payload.slice().sort((x, y) => x - y);

          action.payload.forEach((item, index, array) => {
            res = array[0];
            if (array[index] === array[index - 1]) curr_count++;
            else curr_count = 1;

            if (curr_count > max_count) {
              max_count = curr_count;
              res = array[index - 1];
            }
            return res;
          });
          state.frequentOrderId = res;
          localStorage.setItem('frequentOrderId', res.toString());
        }
      },
    );
  },
});
const userReducer = userSlice.reducer;
export { userReducer };
export const { setOfferPopupActive } = userSlice.actions;

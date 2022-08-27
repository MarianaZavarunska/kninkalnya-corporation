import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderService } from '../../services/order.service';
import { IOrder } from '../../interfaces/order.interface';
import {
  IOrderFromDbInterface,
  ISaveOrder,
} from '../../interfaces/orderFromDb.interface';

interface IInitialState {
  orders: IOrder[];
  orderFromDb: IOrderFromDbInterface;
}

const initialState: IInitialState = {
  orders: [],
  orderFromDb: {} as IOrderFromDbInterface,
};

export const getAllOrders = createAsyncThunk<
  IOrderFromDbInterface[] | undefined
>('order/getAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await orderService.getAllOrders();
    return data as IOrderFromDbInterface[];
  } catch (e) {
    rejectWithValue(e);
  }
});

export const saveOrderInDb = createAsyncThunk(
  'order/save',
  async (data: ISaveOrder, { dispatch, rejectWithValue }) => {
    try {
      const axiosResponse = await orderService.saveOrders(data);
      if (axiosResponse) {
        dispatch(clearState());
      }
    } catch (e) {
      rejectWithValue(e);
    }
  },
);

export const createOrder = createAsyncThunk(
  'order/create',
  async (data: IOrder, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setOrder(data));
    } catch (e) {
      rejectWithValue(e);
    }
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearState: (state) => {
      localStorage.removeItem('order');
      state.orders.length = 0;
    },
    setOrder: (state, action: PayloadAction<IOrder>) => {
      const item = localStorage.getItem('order');
      if (item) {
        state.orders = JSON.parse(item as string);
      }
      const find = state.orders.find(
        (value) => value.dish.id === action.payload.dish.id,
      );
      if (find) {
        state.orders = state.orders.map((value) =>
          value.dish.id === find?.dish.id
            ? {
                ...find,
                quantity: find.quantity + action.payload.quantity,
              }
            : value,
        );
        localStorage.setItem('order', JSON.stringify(state.orders));
      }
      if (!find) {
        state.orders.push(action.payload);
        localStorage.setItem('order', JSON.stringify(state.orders));
      }
    },
    inc: (state, action: PayloadAction<IOrder>) => {
      console.log(action.payload);
      const item = localStorage.getItem('order');

      const dishFromCart = JSON.parse(item as string) as IOrder[];
      console.log(dishFromCart);
      const iOrder = dishFromCart.find(
        (value) => value.dish.id === action.payload.dish.id,
      );
      if (iOrder) {
        state.orders = dishFromCart.map((value) =>
          value.dish.id === iOrder?.dish.id
            ? {
                ...iOrder,
                quantity: iOrder.quantity + 1,
              }
            : value,
        );
        localStorage.setItem('order', JSON.stringify(state.orders));
      }
    },
    dec: (state, action: PayloadAction<IOrder>) => {
      console.log(action.payload);
      const item = localStorage.getItem('order');

      const dishFromCart = JSON.parse(item as string) as IOrder[];
      console.log(dishFromCart);
      const iOrder = dishFromCart.find(
        (value) => value.dish.id === action.payload.dish.id,
      );
      if (iOrder) {
        state.orders = dishFromCart.map((value) =>
          value.dish.id === iOrder?.dish.id
            ? {
                ...iOrder,
                quantity: iOrder.quantity - 1,
              }
            : value,
        );
        if (iOrder.quantity <= 1) {
          state.orders = state.orders.filter(
            (value) => value.dish.id !== iOrder?.dish.id,
          );
          localStorage.setItem('order', JSON.stringify(state.orders));
        }
        localStorage.setItem('order', JSON.stringify(state.orders));
      }
    },
    removeItem: (state, action: PayloadAction<IOrder>) => {
      state.orders = state.orders.filter(
        (value) => value.dish.id !== action.payload.dish.id,
      );
      localStorage.setItem('order', JSON.stringify(state.orders));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllOrders.fulfilled,
      (state, action: PayloadAction<IOrderFromDbInterface[] | undefined>) => {
        if (action.payload)
          state.orderFromDb = action.payload.slice(
            -1,
          )[0] as IOrderFromDbInterface;
      },
    );
  },
});

const orderReducer = orderSlice.reducer;
export { orderReducer };
export const { setOrder, clearState, inc, dec, removeItem } =
  orderSlice.actions;

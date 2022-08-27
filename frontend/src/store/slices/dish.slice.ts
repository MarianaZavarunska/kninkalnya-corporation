import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dishService } from '../../services/dish.service';
import { IDish } from '../../interfaces';

interface IInitialState {
  result: IDish[];
  status: string;
  dishes: IDish[];
  item: number;
  popularDish: IDish;
}

const initialState: IInitialState = {
  result: [],
  status: 'Loading',
  dishes: [],
  item: 1,
  popularDish: {} as IDish,
};

export const getAllDishes = createAsyncThunk<IDish[] | undefined>(
  'dish/getAllDishes',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await dishService.getAllDishes();
      return data;
    } catch (e) {
      rejectWithValue(e);
    }
  },
);

export const getDishById = createAsyncThunk<IDish | undefined, number>(
  'dish/getDishById',
  async (dishId, { rejectWithValue }) => {
    try {
      const { data } = await dishService.getDishById(dishId);
      return data;
    } catch (e) {
      rejectWithValue(e);
    }
  },
);

export const getAllDishByLocalityId = createAsyncThunk(
  'dish/getAllDishByLocalityId',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await dishService.getAllDishes();
      return data.filter((value) => value.localityId === Number(id));
    } catch (e) {
      rejectWithValue(e);
    }
  },
);

const dishSlice = createSlice({
  name: 'dish',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDishByLocalityId.pending, (state) => {
      state.status = 'Loading';
    });
    builder.addCase(
      getAllDishByLocalityId.fulfilled,
      (state, action: PayloadAction<IDish[] | undefined>) => {
        state.status = 'fulfilled';
        const item = localStorage.getItem('restaurantId') || 1;
        if (action.payload) {
          state.result = action.payload.filter(
            (value) => value.restaurantId === +item,
          );
        }
      },
    );
    builder.addCase(
      getAllDishes.fulfilled,
      (state, action: PayloadAction<IDish[] | undefined>) => {
        if (action.payload) {
          state.dishes = action.payload;
        }
      },
    );

    builder.addCase(
      getDishById.fulfilled,
      (state, action: PayloadAction<IDish | undefined>) => {
        if (action.payload) {
          state.popularDish = action.payload;
        }
      },
    );
  },
});
const dishReducer = dishSlice.reducer;
export { dishReducer };

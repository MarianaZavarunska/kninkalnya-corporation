import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRestaurant } from '../../interfaces/restaurant.interface';
import { restaurantService } from '../../services/restaurant.service';

interface IInitialState {
  restaurants: IRestaurant[];
  cities: { city: string }[];
}
const initialState: IInitialState = {
  restaurants: [],
  cities: [],
};

export const getRestaurants = createAsyncThunk<IRestaurant[] | undefined, void>(
  'restaurant/getRestaurants',
  async () => {
    try {
      const { data } = await restaurantService.getRestaurants();
      return data;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  },
);

export const getRestaurantsByCity = createAsyncThunk<
  IRestaurant[] | undefined,
  string
>('restaurant/getRestaurantsByCity', async (city) => {
  try {
    const { data } = await restaurantService.getRestaurantsByCity(city);
    return data;
  } catch (e) {
    console.log(e);
    return undefined;
  }
});

export const getAllCities = createAsyncThunk<
  { city: string }[] | undefined,
  void
>('restaurants/getAllCities', async () => {
  try {
    const { data } = await restaurantService.getAllCity();
    return data;
  } catch (e) {
    console.log(e);
    return undefined;
  }
});

const restaurantSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getRestaurants.fulfilled,
      (state, action: PayloadAction<IRestaurant[] | undefined>) => {
        state.restaurants = action.payload ?? [];
      },
    );

    builder.addCase(
      getRestaurantsByCity.fulfilled,
      (state, action: PayloadAction<IRestaurant[] | undefined>) => {
        state.restaurants = action.payload ?? [];
      },
    );

    builder.addCase(
      getAllCities.fulfilled,
      (state, action: PayloadAction<{ city: string }[] | undefined>) => {
        console.log(action.payload);
        state.cities = action.payload ?? [];
      },
    );
  },
});

const restaurantReducer = restaurantSlice.reducer;
export { restaurantReducer };
// export const {}  = restaurantSlice.actions;

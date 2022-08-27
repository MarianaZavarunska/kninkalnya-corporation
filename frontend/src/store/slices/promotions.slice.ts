import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPromotion } from '../../interfaces/promotion.interface';
import { promotionsService } from '../../services/promotions.service';

interface IInitialState {
  promotion: IPromotion[];
}

const initialState: IInitialState = {
  promotion: [],
};

export const getPromotions = createAsyncThunk<IPromotion[] | undefined, void>(
  'promotions/getPromotions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await promotionsService.getPromotions();
      return data;
    } catch (e) {
      rejectWithValue(e);
      return undefined;
    }
  },
);

const promotionsSlice = createSlice({
  name: 'promotion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getPromotions.fulfilled,
      (state, action: PayloadAction<IPromotion[] | undefined>) => {
        state.promotion = action.payload ?? [];
      },
    );
  },
});
const promotionsReducer = promotionsSlice.reducer;
export { promotionsReducer };

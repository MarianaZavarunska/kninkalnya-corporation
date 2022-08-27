import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IReview } from '../../interfaces';
import { reviewService } from '../../services/review.service';

interface IInitialState {
  reviews?: IReview[];
  status: string;
  isReviewActive: boolean;
}
const initialState: IInitialState = {
  reviews: [],
  status: '',
  isReviewActive: false,
};

export const getAllReviews = createAsyncThunk<IReview[] | undefined, void>(
  'reviewSlice/GetAllReviews',
  async () => {
    try {
      const { data } = await reviewService.GetAllReviews();
      return data;
    } catch (e) {
      return undefined;
    }
  },
);

export const createReview = createAsyncThunk(
  'reviewSlice/CreateReview',
  async (review: Partial<IReview>) => {
    try {
      const { data } = await reviewService.CreateReview(review);
      return data;
    } catch (e) {
      return undefined;
    }
  },
);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReviewActive: (state) => {
      state.isReviewActive = !state.isReviewActive;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllReviews.fulfilled,
      (state, action: PayloadAction<IReview[] | undefined>) => {
        state.reviews = action.payload;
      },
    );
    builder.addCase(createReview.fulfilled, (state, action) => {
      const review = action.payload;
      review && state.reviews && state.reviews.push(review);
      state.status = 'created';
      state.isReviewActive = false;
      console.log(action.payload);
    });
  },
});

const reviewReducer = reviewSlice.reducer;
export const { setReviewActive } = reviewSlice.actions;
export { reviewReducer };

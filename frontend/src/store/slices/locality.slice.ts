import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILocality } from '../../interfaces';
import { localityService } from '../../services/locality.service';

interface IInitialState {
  locality: ILocality[];
}

const initialState: IInitialState = {
  locality: [],
};
export const getLocality = createAsyncThunk<ILocality[] | undefined, void>(
  'locality/getLocality',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await localityService.getLocality();
      return data;
    } catch (e) {
      rejectWithValue(e);
      return undefined;
    }
  },
);
const localitySlice = createSlice({
  name: 'locality',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getLocality.fulfilled,
      (state, action: PayloadAction<ILocality[] | undefined>) => {
        state.locality = action.payload ?? [];
      },
    );
  },
});
const localityReducer = localitySlice.reducer;
export { localityReducer };

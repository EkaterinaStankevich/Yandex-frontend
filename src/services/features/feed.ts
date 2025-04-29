import { IStateWithStatus } from '../types';
import { TOrder } from '@utils-types';
import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { RootState } from '../store';

const initialState: {
  total: number;
  totalToday: number;
} & IStateWithStatus<TOrder> = {
  status: 'initial',
  items: [],
  total: 0,
  totalToday: 0
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(getFeed.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        state.items = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      })
      .addCase(getFeed.pending, (state) => {
        state.status = 'pending';
      });
  }
});

export const getFeedOrder = createSelector(
  [
    (state: RootState) => state.feed.items,
    (_, feedNumber: number) => feedNumber
  ],
  (orders, feedNumber) => orders.find((order) => order.number === feedNumber)
);

export const getFeed = createAsyncThunk('feed/getFeed', getFeedsApi);

export const feedReducer = feedSlice.reducer;

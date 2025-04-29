import { IStateWithStatus, Status } from '../types';
import { TOrder } from '@utils-types';
import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '@api';
import { clearConstructor } from './constructor';
import { RootState } from '../store';

const initialState: {
  currentOrder: TOrder | null;
  currentOrderStatus: Status;
} & IStateWithStatus<TOrder> = {
  status: 'initial',
  items: [],
  currentOrder: null,
  currentOrderStatus: 'initial'
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    removeCurrentOrder(state) {
      state.currentOrder = null;
      state.currentOrderStatus = 'initial';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        state.items = payload;
      })
      .addCase(getOrders.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(makeOrder.rejected, (state) => {
        state.currentOrderStatus = 'rejected';
      })
      .addCase(makeOrder.fulfilled, (state, { payload }) => {
        state.currentOrderStatus = 'fulfilled';
        state.currentOrder = payload.order;

        state.items.unshift(payload.order);
      })
      .addCase(makeOrder.pending, (state) => {
        state.currentOrderStatus = 'pending';
      });
  }
});

export const getOrders = createAsyncThunk('orders/getOrders', getOrdersApi);
export const makeOrder = createAsyncThunk(
  'orders/makeOrder',
  async (items: string[], { dispatch }) => {
    try {
      const response = await orderBurgerApi(items);
      dispatch(clearConstructor());
      return response;
    } catch (e) {
      throw new Error();
    }
  }
);

export const getOrder = createSelector(
  [
    (state: RootState) => state.orders.items,
    (_, feedNumber: number) => feedNumber
  ],
  (orders, feedNumber) => orders.find((order) => order.number === feedNumber)
);

export const { removeCurrentOrder } = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;

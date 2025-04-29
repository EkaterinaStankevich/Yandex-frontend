import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { IStateWithStatus } from '../types';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';
import { RootState } from '../store';

const initialState: IStateWithStatus<TIngredient> = {
  items: [],
  status: 'initial'
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(getIngredients.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        state.items = payload;
      })
      .addCase(getIngredients.pending, (state) => {
        state.status = 'pending';
      });
  }
});

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

function getIngredientsByType(type: string) {
  return createSelector(
    (state: RootState) => state.ingredients,
    (ingredientsSlice) =>
      ingredientsSlice.items.filter((ingredient) => ingredient.type === type)
  );
}

export const getBuns = getIngredientsByType('bun');
export const getMains = getIngredientsByType('main');
export const getSauces = getIngredientsByType('sauce');

export const getIngredient = createSelector(
  [(state: RootState) => state.ingredients, (_, id: string) => id],
  (ingredients, id) => ingredients.items.find((x) => x._id === id)
);

export const ingredientsReducer = ingredientsSlice.reducer;

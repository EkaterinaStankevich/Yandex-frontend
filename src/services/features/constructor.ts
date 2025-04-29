import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { IStateWithStatus } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

interface IConstructorState extends IStateWithStatus<TConstructorIngredient> {
  bun: null | TConstructorIngredient;
  order: null | TOrder;
}

const initialState: IConstructorState = {
  bun: null,
  order: null,
  items: [],
  status: 'initial'
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addConstructorIngredient(state, action: PayloadAction<TIngredient>) {
      const newIngredient = Object.assign({ id: v4() }, action.payload);

      if (newIngredient.type === 'bun') state.bun = newIngredient;
      else state.items.push(newIngredient);
    },
    deleteConstructorIngredient(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveConstructorIngredient(
      state,
      action: PayloadAction<{
        id: string;
        to: 'up' | 'down';
      }>
    ) {
      const ingredient = state.items.find(
        (ingredient) => ingredient.id === action.payload.id
      );
      if (ingredient) {
        const ingredientIndex = state.items.indexOf(ingredient);

        const direction = action.payload.to === 'up' ? -1 : 1;
        const prevElement = state.items[ingredientIndex + direction];
        state.items[ingredientIndex + direction] = ingredient;
        state.items[ingredientIndex] = prevElement;
      }
    },
    clearConstructor(state) {
      state.items = [];
      state.bun = null;
    }
  }
});

export const {
  addConstructorIngredient,
  deleteConstructorIngredient,
  moveConstructorIngredient,
  clearConstructor
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;

import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './features/ingredients';
import { constructorReducer } from './features/constructor';
import { ordersReducer } from './features/orders';
import { feedReducer } from './features/feed';
import { authReducer } from './features/auth';

const RootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  orders: ordersReducer,
  feed: feedReducer,
  auth: authReducer
});

export { RootReducer };

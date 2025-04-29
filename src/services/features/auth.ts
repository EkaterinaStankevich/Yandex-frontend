import { TUser } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { Status } from '../types';

interface AuthState {
  user: TUser | null;
  status: Status;
}

const initialState: AuthState = {
  user: null,
  status: 'initial'
};

function toggleStatePendingStatus(state: AuthState) {
  state.status = 'pending';
}

function toggleStateRejectedStatus(state: AuthState) {
  state.status = 'rejected';
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, toggleStatePendingStatus)
      .addCase(registration.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        const { user, accessToken, refreshToken } = payload;

        state.user = user;

        setCookie('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      })
      .addCase(registration.rejected, toggleStateRejectedStatus)
      .addCase(login.pending, toggleStatePendingStatus)
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        const { user, accessToken, refreshToken } = payload;

        state.user = user;

        setCookie('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      })
      .addCase(login.rejected, toggleStateRejectedStatus)
      .addCase(updateUser.pending, toggleStatePendingStatus)
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        const { user } = payload;

        state.user = user;
      })
      .addCase(updateUser.rejected, toggleStateRejectedStatus)
      .addCase(logout.pending, toggleStatePendingStatus)
      .addCase(logout.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.user = null;

        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logout.rejected, toggleStateRejectedStatus)
      .addCase(getUser.pending, toggleStatePendingStatus)
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled';
        const { user } = payload;

        state.user = user;
      })
      .addCase(getUser.rejected, toggleStateRejectedStatus);
  }
});

export const registration = createAsyncThunk(
  'auth/registration',
  (data: TRegisterData) => registerUserApi(data)
);

export const login = createAsyncThunk('auth/login', (data: TLoginData) =>
  loginUserApi(data)
);

export const updateUser = createAsyncThunk(
  'auth/update',
  (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const logout = createAsyncThunk('auth/logout', logoutApi);
export const getUser = createAsyncThunk('auth/getUser', getUserApi);

export const authReducer = authSlice.reducer;

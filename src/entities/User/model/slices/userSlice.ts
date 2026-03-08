import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RegisterResponseBody, UserState } from '../types';
import { getAuthDataFromStorage } from '../../lib/utils/userStorage';

const storedAuthData = getAuthDataFromStorage();

const initialState: UserState = {
  user: storedAuthData?.user ?? null,
  accessToken: storedAuthData?.accessToken ?? null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<RegisterResponseBody>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    clearAuthData: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;

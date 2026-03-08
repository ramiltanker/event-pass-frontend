import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthResponse, User, UserState } from '../types';
import { getAccessTokenFromStorage } from '../../lib/utils';

const initialState: UserState = {
  user: null,
  accessToken: getAccessTokenFromStorage(),
  isInitialized: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearAuthData: (state) => {
      state.user = null;
      state.accessToken = null;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;

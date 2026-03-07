import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { InviteState } from '../types/types';

const initialState: InviteState = {
  token: null,
  email: null,
  isValidated: false,
};

const inviteSlice = createSlice({
  name: 'invite',
  initialState,
  reducers: {
    setInviteData(
      state,
      action: PayloadAction<{
        token: string;
        email: string;
      }>,
    ) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isValidated = true;
    },
    clearInviteData(state) {
      state.token = null;
      state.email = null;
      state.isValidated = false;
    },
  },
});

export const { actions: inviteActions, reducer: inviteReducer } = inviteSlice;

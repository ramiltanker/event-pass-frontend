import { configureStore } from '@reduxjs/toolkit';
import { inviteReducer } from 'entities/Invite';
import { userReducer } from 'entities/User';
import { api, privateApi } from 'shared/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [privateApi.reducerPath]: privateApi.reducer,
    invite: inviteReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, privateApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

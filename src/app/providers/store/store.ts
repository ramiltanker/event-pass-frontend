import { configureStore } from '@reduxjs/toolkit';
import { inviteReducer } from 'entities/Invite';
import { userReducer } from 'entities/User';
import { api } from 'shared/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    invite: inviteReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

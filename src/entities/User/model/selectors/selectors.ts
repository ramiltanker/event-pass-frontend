import type { RootState } from 'app/providers';

export const selectUser = (state: RootState) => state.user.user;

export const selectAccessToken = (state: RootState) => state.user.accessToken;

export const selectIsAuthenticated = (state: RootState) => Boolean(state.user.accessToken);

export const selectIsUserInitialized = (state: RootState) => state.user.isInitialized;

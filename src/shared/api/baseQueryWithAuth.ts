import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from 'app/providers';

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.accessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

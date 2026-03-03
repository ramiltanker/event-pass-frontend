import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  }),
  endpoints: (builder) => ({
    health: builder.query<{ ok: boolean }, void>({
      query: () => '/health',
    }),
  }),
});

export const { useHealthQuery } = api;

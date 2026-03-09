import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQueryWithAuth';

const privateApi = createApi({
  reducerPath: 'privateUserApi',
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes: ['Invites'],
});

export { privateApi };

import type { User } from '../../model/types';
import { privateApi } from 'shared/api';

export const privateUserApi = privateApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetMeQuery, useLazyGetMeQuery } = privateUserApi;

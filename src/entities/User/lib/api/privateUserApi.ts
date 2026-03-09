import type { UpdateMePayload, User } from '../../model/types';
import { privateApi } from 'shared/api';

export const privateUserApi = privateApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
    }),
    updateMe: builder.mutation<User, UpdateMePayload>({
      query: (body) => ({
        url: '/auth/me',
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useGetMeQuery, useLazyGetMeQuery, useUpdateMeMutation } = privateUserApi;
import type { Invite, InviteStatusFilter, UpdateMePayload, User } from '../../model/types';
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
    getInvites: builder.query<Invite[], InviteStatusFilter | void>({
      query: (status = 'all') => ({
        url: '/auth/invites',
        method: 'GET',
        params: { status },
      }),
      providesTags: ['Invites'],
    }),
  }),
});

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useGetInvitesQuery,
  useLazyGetInvitesQuery,
  useUpdateMeMutation,
} = privateUserApi;

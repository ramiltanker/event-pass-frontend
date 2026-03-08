import type { RegisterRequestBody, RegisterResponseBody } from '../../model/types';
import { api } from 'shared/api';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerByInvite: builder.mutation<RegisterResponseBody, RegisterRequestBody>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterByInviteMutation } = userApi;

import type {
  LoginRequestBody,
  LoginResponseBody,
  RegisterRequestBody,
  RegisterResponseBody,
  User,
} from '../../model/types';
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
    login: builder.mutation<LoginResponseBody, LoginRequestBody>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterByInviteMutation, useLoginMutation } = userApi;

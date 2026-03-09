import type {
  ForgotPasswordRequestBody,
  ForgotPasswordResponseBody,
  LoginRequestBody,
  LoginResponseBody,
  RegisterRequestBody,
  RegisterResponseBody,
  ResetPasswordRequestBody,
  ResetPasswordResponseBody,
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
    forgotPassword: builder.mutation<ForgotPasswordResponseBody, ForgotPasswordRequestBody>({
      query: (body) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),

    resetPassword: builder.mutation<ResetPasswordResponseBody, ResetPasswordRequestBody>({
      query: (body) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterByInviteMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userApi;

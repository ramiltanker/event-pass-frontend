import type { ValidateInviteRequest, ValidateInviteResponse } from '../../model/types';

import { api } from 'shared/api';

export const inviteApi = api.injectEndpoints({
  endpoints: (builder) => ({
    validateInvite: builder.mutation<ValidateInviteResponse, ValidateInviteRequest>({
      query: (body) => ({
        url: '/auth/validate-invite',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useValidateInviteMutation } = inviteApi;

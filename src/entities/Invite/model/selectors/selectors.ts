import type { RootState } from 'app/providers';

export const selectInvite = (state: RootState) => state.invite;

export const selectInviteToken = (state: RootState) => state.invite.token;

export const selectInviteEmail = (state: RootState) => state.invite.email;

export const selectIsInviteValidated = (state: RootState) => state.invite.isValidated;

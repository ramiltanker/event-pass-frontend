export interface ValidateInviteRequest {
  token: string;
}

export type ValidateInviteResponse =
  | {
      valid: true;
      email: string;
    }
  | {
      valid: false;
    };

export interface InviteState {
  token: string | null;
  email: string | null;
  isValidated: boolean;
}

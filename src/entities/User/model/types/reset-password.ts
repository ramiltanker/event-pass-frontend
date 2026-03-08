export interface ResetPasswordRequestBody {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponseBody {
  message: string;
}

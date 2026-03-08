import type { AuthResponse } from './types';

export interface LoginRequestBody {
  email: string;
  password: string;
}

export type LoginResponseBody = AuthResponse;

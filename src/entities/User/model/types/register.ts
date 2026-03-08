import type { AuthResponse } from './types';

export interface RegisterRequestBody {
  token: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  password: string;
}

export type RegisterResponseBody = AuthResponse;

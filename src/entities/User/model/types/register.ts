import type { User } from './types';

export interface RegisterRequestBody {
  token: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  password: string;
}

export interface RegisterResponseBody {
  user: User;
  accessToken: string;
}

export enum UserRole {
  TEACHER = 'TEACHER',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  role: UserRole;
}

export interface UserState {
  user: User | null;
  accessToken: string | null;
}

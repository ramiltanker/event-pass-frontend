import type { RegisterResponseBody } from '../../../model/types';
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY, LOCAL_STORAGE_USER_KEY } from '../../constants';

export const saveAuthDataToStorage = (data: RegisterResponseBody) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, data.accessToken);
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(data.user));
};

export const clearAuthDataFromStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
};

export const getAuthDataFromStorage = () => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  const rawUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

  if (!accessToken || !rawUser) {
    return null;
  }

  try {
    const user = JSON.parse(rawUser);
    return { accessToken, user };
  } catch {
    return null;
  }
};

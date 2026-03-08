import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '../../constants';

const saveAccessTokenToStorage = (accessToken: string) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
};

const getAccessTokenFromStorage = () => {
  return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
};

const clearAuthStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
};

export { saveAccessTokenToStorage, getAccessTokenFromStorage, clearAuthStorage };

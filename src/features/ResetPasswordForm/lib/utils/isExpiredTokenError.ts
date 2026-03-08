import { getErrorMessage } from './getErrorMessage';

export const isExpiredTokenError = (error: unknown): boolean => {
  const message = getErrorMessage(error).toLowerCase();

  return (
    message.includes('invalid or expired token') ||
    message.includes('expired') ||
    message.includes('token') ||
    message.includes('истек') ||
    message.includes('истёк') ||
    message.includes('недейств')
  );
};

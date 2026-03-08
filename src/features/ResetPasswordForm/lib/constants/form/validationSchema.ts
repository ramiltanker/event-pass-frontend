import * as yup from 'yup';

export const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required('Введите новый пароль')
    .min(6, 'Пароль должен содержать минимум 6 символов'),
  confirmPassword: yup
    .string()
    .required('Подтвердите пароль')
    .oneOf([yup.ref('newPassword')], 'Пароли не совпадают'),
});

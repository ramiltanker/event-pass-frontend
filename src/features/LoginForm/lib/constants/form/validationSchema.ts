import type { LoginFormValues } from '../../../model/types';
import * as yup from 'yup';

export const loginSchema: yup.ObjectSchema<LoginFormValues> = yup
  .object({
    email: yup
      .string()
      .required('Введите адрес электронной почты')
      .email('Некорректный адрес электронной почты'),
    password: yup
      .string()
      .required('Введите пароль')
      .min(8, 'Пароль должен содержать минимум 8 символов'),
  })
  .required();

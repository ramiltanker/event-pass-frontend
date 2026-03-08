import * as yup from 'yup';

export const forgotPasswordSchema = yup.object({
  email: yup.string().required('Введите email').email('Введите корректный email'),
});

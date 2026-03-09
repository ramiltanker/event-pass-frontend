import * as yup from 'yup';

export const inviteCreateSchema = yup.object({
  email: yup.string().email('Некорректный email').required('Введите email'),

  expiresInDays: yup
    .number()
    .typeError('Введите число')
    .min(1, 'Минимум 1 день')
    .max(30, 'Максимум 30 дней')
    .required('Укажите срок действия'),
});

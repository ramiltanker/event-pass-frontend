import { TextField } from '@mui/material';
import type { RegisterFormValues } from '../../model/types';
import { Controller, useFormContext } from 'react-hook-form';

const PasswordInput = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  const error = errors.password?.message;

  return (
    <Controller
      name="password"
      control={control}
      rules={{
        required: 'Введите пароль',
        minLength: {
          value: 8,
          message: 'Минимум 8 символов',
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          type="password"
          label="Пароль*"
          placeholder="Введите пароль"
          error={!!error}
          helperText={error}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      )}
    />
  );
};

export { PasswordInput };

import { TextField } from '@mui/material';
import type { RegisterFormValues } from '../../model/types';
import { Controller, useFormContext } from 'react-hook-form';

const ConfirmPasswordInput = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<RegisterFormValues>();

  const passwordValue = watch('password');

  const error = errors.confirmPassword?.message;

  return (
    <Controller
      name="confirmPassword"
      control={control}
      rules={{
        required: 'Подтвердите пароль',
        validate: (value) => value === passwordValue || 'Пароли не совпадают',
      }}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          type="password"
          label="Подтверждение пароля*"
          placeholder="Подтверждение пароля"
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

export { ConfirmPasswordInput };

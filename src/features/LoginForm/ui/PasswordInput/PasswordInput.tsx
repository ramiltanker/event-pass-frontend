import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import type { LoginFormValues } from '../../model/types';

const PasswordInput = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<LoginFormValues>();

  const error = errors.password?.message;

  return (
    <Controller
      name="password"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          type="password"
          label="Пароль"
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

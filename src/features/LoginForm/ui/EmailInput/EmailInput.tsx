import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import type { LoginFormValues } from '../../model/types';

const EmailInput = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<LoginFormValues>();

  const error = errors.email?.message;

  return (
    <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label="Почта"
          placeholder="Введите адрес электронной почты"
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

export { EmailInput };

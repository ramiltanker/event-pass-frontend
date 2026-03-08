import { TextField } from '@mui/material';
import type { RegisterFormValues } from '../../model/types';
import { Controller, useFormContext } from 'react-hook-form';

const EmailInput = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  const error = errors.email?.message;

  return (
    <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label="Почта*"
          placeholder="Введите адрес электронной почты"
          error={!!error}
          helperText={error}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            input: {
              readOnly: true,
            },
          }}
        />
      )}
    />
  );
};

export { EmailInput };

import { TextField } from '@mui/material';
import type { RegisterFormValues } from '../../model/types';
import { Controller, useFormContext } from 'react-hook-form';

const FirstNameInput = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  const error = errors.firstName?.message;

  return (
    <Controller
      name="firstName"
      control={control}
      rules={{
        required: 'Введите имя',
      }}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label="Имя*"
          placeholder="Имя"
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

export { FirstNameInput };

import { TextField } from '@mui/material';
import type { RegisterFormValues } from '../../model/types';
import { Controller, useFormContext } from 'react-hook-form';

const LastNameInput = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormValues>();

  const error = errors.lastName?.message;

  return (
    <Controller
      name="lastName"
      control={control}
      rules={{
        required: 'Введите фамилию',
      }}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label="Фамилия*"
          placeholder="Фамилия"
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

export { LastNameInput };

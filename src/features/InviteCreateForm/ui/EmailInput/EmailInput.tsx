import { TextField } from '@mui/material';
import type { CreateInviteFormValues } from '../../model/types';
import { Controller, useFormContext } from 'react-hook-form';

const EmailInput = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateInviteFormValues>();

  const error = errors.email?.message;

  return (
    <Controller
      name="email"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label="Email преподавателя"
          fullWidth
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};

export { EmailInput };

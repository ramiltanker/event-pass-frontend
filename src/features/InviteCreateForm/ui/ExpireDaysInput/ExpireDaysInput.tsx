import { TextField } from '@mui/material';
import type { CreateInviteFormValues } from '../../model/types';
import { Controller, useFormContext } from 'react-hook-form';

const ExpireDaysInput = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateInviteFormValues>();

  const error = errors.expiresInDays?.message;

  return (
    <Controller
      name="expiresInDays"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label="Срок действия, дней"
          type="number"
          sx={{ minWidth: 220 }}
          error={!!error}
          helperText={error}
          onChange={(event) => {
            const value = event.target.value;
            field.onChange(value === '' ? undefined : Number(value));
          }}
        />
      )}
    />
  );
};

export { ExpireDaysInput };

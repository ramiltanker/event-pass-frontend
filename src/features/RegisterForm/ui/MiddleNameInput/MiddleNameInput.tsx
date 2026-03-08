import { TextField } from '@mui/material';
import type { RegisterFormValues } from '../../model/types';
import { Controller, useFormContext } from 'react-hook-form';

const MiddleNameInput = () => {
  const { control } = useFormContext<RegisterFormValues>();

  return (
    <Controller
      name="middleName"
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label="Отчество"
          placeholder="Отчество"
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

export { MiddleNameInput };

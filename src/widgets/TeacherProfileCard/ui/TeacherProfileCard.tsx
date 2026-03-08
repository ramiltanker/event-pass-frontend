import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  selectUser,
  userActions,
  useUpdateMeMutation,
} from 'entities/User';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';

type EditableField = 'firstName' | 'lastName' | 'middleName' | null;
type FieldKey = Exclude<EditableField, null>;

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  middleName: string;
};

const getApiErrorMessage = (error: unknown) => {
  if (!error || typeof error !== 'object') {
    return null;
  }

  const maybeData = (error as { data?: unknown }).data;

  if (typeof maybeData === 'string') {
    return maybeData;
  }

  if (maybeData && typeof maybeData === 'object') {
    const message = (maybeData as { message?: unknown }).message;

    if (typeof message === 'string') {
      return message;
    }

    if (Array.isArray(message)) {
      return message.filter((item) => typeof item === 'string').join(', ');
    }
  }

  return null;
};

const TeacherProfileCard = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [activeField, setActiveField] = useState<EditableField>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [values, setValues] = useState<ProfileFormValues>({
    firstName: '',
    lastName: '',
    middleName: '',
  });

  const [updateMe, { isLoading }] = useUpdateMeMutation();

  useEffect(() => {
    if (!user) {
      return;
    }

    setValues({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      middleName: user.middleName ?? '',
    });
  }, [user]);

  const fullName = useMemo(() => {
    return [values.lastName.trim(), values.firstName.trim(), values.middleName.trim()]
      .filter(Boolean)
      .join(' ');
  }, [values]);

  const initials = useMemo(() => {
    const firstLetter = values.firstName.trim()[0] ?? '';
    const lastLetter = values.lastName.trim()[0] ?? '';

    return `${firstLetter}${lastLetter}`.toUpperCase() || 'T';
  }, [values]);

  const handleStartEdit = (field: FieldKey) => {
    setErrorMessage('');
    setSuccessMessage('');
    setActiveField(field);
  };

  const handleCancel = () => {
    if (!user) {
      setActiveField(null);
      return;
    }

    setValues({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      middleName: user.middleName ?? '',
    });
    setErrorMessage('');
    setSuccessMessage('');
    setActiveField(null);
  };

  const handleChange =
    (field: FieldKey) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSave = async () => {
    if (!user || !activeField) {
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');

    const rawValue = values[activeField];
    const trimmedValue = rawValue.trim();

    if (activeField !== 'middleName' && !trimmedValue) {
      setErrorMessage(
        activeField === 'firstName'
          ? 'Имя не может быть пустым.'
          : 'Фамилия не может быть пустой.',
      );
      return;
    }

    try {
      const payload =
        activeField === 'middleName'
          ? { middleName: trimmedValue }
          : { [activeField]: trimmedValue };

      const updatedUser = await updateMe(payload).unwrap();

      dispatch(userActions.setUser(updatedUser));
      setSuccessMessage('Данные успешно сохранены.');
      setActiveField(null);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error) ?? 'Не удалось сохранить изменения.');
    }
  };

  if (!user) {
    return <Alert severity="warning">Не удалось загрузить данные преподавателя.</Alert>;
  }

  const isFieldEditing = (field: FieldKey) => activeField === field;
  const isAnotherFieldEditing = (field: FieldKey) =>
    activeField !== null && activeField !== field;

  const renderField = (
    field: FieldKey,
    label: string,
    placeholder: string,
  ) => {
    const editing = isFieldEditing(field);

    return (
      <Box key={field}>
        <Typography
          sx={{
            fontSize: '11px',
            lineHeight: 1.2,
            color: '#8E8E8E',
            mb: 0.75,
          }}
        >
          {label}
        </Typography>

        {editing ? (
          <Stack spacing={1.25}>
            <TextField
              fullWidth
              size="small"
              value={values[field]}
              onChange={handleChange(field)}
              disabled={isLoading}
              placeholder={placeholder}
              autoFocus
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: '#FAFAFA',
                },
              }}
            />

            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={isLoading}
                sx={{
                  flex: 1,
                  minHeight: 38,
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 600,
                  backgroundColor: '#A61D0A',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#8F1708',
                    boxShadow: 'none',
                  },
                }}
              >
                Сохранить
              </Button>

              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={isLoading}
                sx={{
                  flex: 1,
                  minHeight: 38,
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: '#D8D8D8',
                  color: '#5F5F5F',
                }}
              >
                Отменить
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Box
              sx={{
                flex: 1,
                minHeight: 40,
                px: 1.25,
                display: 'flex',
                alignItems: 'center',
                borderRadius: '10px',
                backgroundColor: '#FFFFFF',
              }}
            >
              <Typography
                sx={{
                  fontSize: '13px',
                  lineHeight: 1.4,
                  color: values[field].trim() ? '#1F1F1F' : '#A0A0A0',
                  wordBreak: 'break-word',
                }}
              >
                {values[field].trim() || placeholder}
              </Typography>
            </Box>

            <IconButton
              onClick={() => handleStartEdit(field)}
              disabled={isAnotherFieldEditing(field) || isLoading}
              sx={{
                width: 26,
                height: 26,
                borderRadius: '8px',
                color: '#9A9A9A',
              }}
            >
              <Box
                component="span"
                sx={{
                  fontSize: '14px',
                  lineHeight: 1,
                }}
              >
                ✎
              </Box>
            </IconButton>
          </Stack>
        )}
      </Box>
    );
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: '100%',
        maxWidth: 280,
        borderRadius: '14px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.10)',
        border: '1px solid #E9E9E9',
      }}
    >
      <Box sx={{ px: 2, py: 2.25 }}>
        <Stack spacing={2}>
          <Stack spacing={1} alignItems="center">
            <Avatar
              sx={{
                width: 72,
                height: 72,
                fontSize: 26,
                fontWeight: 700,
                bgcolor: '#D9D9D9',
                color: '#4A4A4A',
              }}
            >
              {initials}
            </Avatar>

            <Typography
              sx={{
                fontSize: '20px',
                lineHeight: 1.2,
                fontWeight: 700,
                color: '#1F1F1F',
                textAlign: 'center',
              }}
            >
              {fullName || 'Профиль преподавателя'}
            </Typography>
          </Stack>

          {errorMessage ? (
            <Alert severity="error" sx={{ py: 0 }}>
              {errorMessage}
            </Alert>
          ) : null}

          {successMessage ? (
            <Alert severity="success" sx={{ py: 0 }}>
              {successMessage}
            </Alert>
          ) : null}

          <Stack spacing={1.5}>
            {renderField('firstName', 'Имя', 'Введите имя')}
            {renderField('lastName', 'Фамилия', 'Введите фамилию')}
            {renderField('middleName', 'Отчество', 'Введите отчество')}

            <Box>
              <Typography
                sx={{
                  fontSize: '11px',
                  lineHeight: 1.2,
                  color: '#8E8E8E',
                  mb: 0.75,
                }}
              >
                Email
              </Typography>

              <Box
                sx={{
                  minHeight: 40,
                  px: 1.25,
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '13px',
                    lineHeight: 1.4,
                    color: '#1F1F1F',
                    wordBreak: 'break-word',
                  }}
                >
                  {user.email}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

export { TeacherProfileCard };
import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';

import {
  type MyConsultationItem,
  useCreateConsultationMutation,
  useDeleteConsultationMutation,
  useGetMyConsultationsQuery,
  useUpdateConsultationMutation,
} from 'entities/Consultation';

type TeacherConsultationCreateFormValues = {
  subject: string;
  description: string;
  meetingLink: string;
  date: string;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
};

const defaultValues: TeacherConsultationCreateFormValues = {
  subject: '',
  description: '',
  meetingLink: '',
  date: '',
  startTime: '',
  endTime: '',
  slotDurationMinutes: 30,
};

const slotDurationOptions = [5, 10, 15, 20, 30, 45, 60, 90, 120];

const toIsoString = (date: string, time: string) => {
  if (!date || !time) return '';

  const localDate = new Date(`${date}T${time}`);

  if (Number.isNaN(localDate.getTime())) {
    return '';
  }

  return localDate.toISOString();
};

const toLocalDateInputValue = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);

  return localDate.toISOString().slice(0, 10);
};

const toLocalTimeInputValue = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);

  return localDate.toISOString().slice(11, 16);
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
};

const formatTimeRange = (startsAt: string, endsAt: string) => {
  const formatter = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${formatter.format(new Date(startsAt))} - ${formatter.format(new Date(endsAt))}`;
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

const mapConsultationToFormValues = (
  consultation: MyConsultationItem,
): TeacherConsultationCreateFormValues => {
  return {
    subject: consultation.subject,
    description: consultation.description ?? '',
    meetingLink: consultation.meetingLink,
    date: toLocalDateInputValue(consultation.startsAt),
    startTime: toLocalTimeInputValue(consultation.startsAt),
    endTime: toLocalTimeInputValue(consultation.endsAt),
    slotDurationMinutes: consultation.slotDurationMinutes,
  };
};

const sectionCardStyles = {
  borderRadius: '16px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.10)',
  backgroundColor: '#FFFFFF',
  border: '1px solid #E9E9E9',
};

const TeacherConsultationCreate = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [editingConsultation, setEditingConsultation] = useState<MyConsultationItem | null>(null);
  const [consultationToDelete, setConsultationToDelete] = useState<MyConsultationItem | null>(null);

  const {
    data: myConsultations,
    isLoading: isMyConsultationsLoading,
    isError: isMyConsultationsError,
    refetch,
  } = useGetMyConsultationsQuery();

  const [createConsultation, { isLoading: isCreating }] = useCreateConsultationMutation();
  const [updateConsultation, { isLoading: isUpdating }] = useUpdateConsultationMutation();
  const [deleteConsultation, { isLoading: isDeleting }] = useDeleteConsultationMutation();

  const isEditMode = Boolean(editingConsultation);
  const isSubmitting = isCreating || isUpdating;

  const form = useForm<TeacherConsultationCreateFormValues>({
    mode: 'onBlur',
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = form;

  const sortedConsultations = useMemo(() => {
    if (!myConsultations) return [];

    return [...myConsultations].sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    );
  }, [myConsultations]);

  const resetToCreateMode = () => {
    setEditingConsultation(null);
    setSuccessMessage('');
    clearErrors();
    reset(defaultValues);
  };

  const handleStartEdit = (consultation: MyConsultationItem) => {
    setSuccessMessage('');
    clearErrors();
    setEditingConsultation(consultation);
    reset(mapConsultationToFormValues(consultation));
  };

  const handleCancelEdit = () => {
    resetToCreateMode();
  };

  const onSubmit: SubmitHandler<TeacherConsultationCreateFormValues> = async (values) => {
    setSuccessMessage('');
    clearErrors('root');

    const startsAt = toIsoString(values.date, values.startTime);
    const endsAt = toIsoString(values.date, values.endTime);

    if (!startsAt || !endsAt) {
      setError('root', {
        type: 'manual',
        message: 'Проверьте дату и время консультации.',
      });
      return;
    }

    if (new Date(endsAt) <= new Date(startsAt)) {
      setError('root', {
        type: 'manual',
        message: 'Время окончания должно быть позже времени начала.',
      });
      return;
    }

    if (new Date(startsAt) <= new Date()) {
      setError('root', {
        type: 'manual',
        message: 'Консультация должна начинаться в будущем.',
      });
      return;
    }

    const payload = {
      subject: values.subject.trim(),
      description: values.description.trim() || undefined,
      meetingLink: values.meetingLink.trim(),
      startsAt,
      endsAt,
      slotDurationMinutes: Number(values.slotDurationMinutes),
    };

    try {
      if (editingConsultation) {
        const response = await updateConsultation({
          id: editingConsultation.id,
          body: payload,
        }).unwrap();

        setSuccessMessage(
          `Изменения сохранены. ID: ${response.id}. Слотов создано: ${response.slotsCreated}.`,
        );

        await refetch();
        resetToCreateMode();
        return;
      }

      const response = await createConsultation(payload).unwrap();

      setSuccessMessage(
        `Консультация создана. ID: ${response.id}. Слотов создано: ${response.slotsCreated}.`,
      );

      reset(defaultValues);
      await refetch();
    } catch (error) {
      setError('root', {
        type: 'server',
        message:
          getApiErrorMessage(error) ??
          (editingConsultation
            ? 'Не удалось сохранить изменения.'
            : 'Не удалось создать консультацию. Проверьте введённые данные.'),
      });
    }
  };

  const handleDelete = async () => {
    if (!consultationToDelete) {
      return;
    }

    setSuccessMessage('');

    try {
      await deleteConsultation(consultationToDelete.id).unwrap();

      if (editingConsultation?.id === consultationToDelete.id) {
        resetToCreateMode();
      }

      setConsultationToDelete(null);
      setSuccessMessage(`Консультация ID ${consultationToDelete.id} удалена.`);
      await refetch();
    } catch (error) {
      setConsultationToDelete(null);
      setError('root', {
        type: 'server',
        message: getApiErrorMessage(error) ?? 'Не удалось удалить консультацию.',
      });
    }
  };

  const canManageConsultation = (consultation: MyConsultationItem) => {
    return new Date(consultation.startsAt) > new Date() && consultation.slotsBooked === 0;
  };

  return (
    <>
      <Stack spacing={3}>
        <Card elevation={0} sx={sectionCardStyles}>
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography
              sx={{
                fontSize: { xs: '24px', sm: '28px' },
                fontWeight: 700,
                lineHeight: 1.2,
                mb: 3,
              }}
            >
              {isEditMode ? 'Редактирование консультации' : 'Создать консультацию'}
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2.5}>
                {isEditMode ? (
                  <Alert severity="info">
                    Вы редактируете консультацию. Чтобы выйти из режима редактирования, нажмите
                    «Отменить».
                  </Alert>
                ) : null}

                {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}

                {errors.root?.message ? <Alert severity="error">{errors.root.message}</Alert> : null}

                <TextField
                  label="Название предмета"
                  fullWidth
                  {...register('subject', {
                    required: 'Введите название предмета.',
                    validate: (value) =>
                      value.trim().length > 0 || 'Введите название предмета.',
                  })}
                  error={Boolean(errors.subject)}
                  helperText={errors.subject?.message}
                />

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    label="Дата проведения"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register('date', {
                      required: 'Выберите дату.',
                    })}
                    error={Boolean(errors.date)}
                    helperText={errors.date?.message}
                  />

                  <TextField
                    select
                    label="Интервал приёма"
                    fullWidth
                    defaultValue={30}
                    {...register('slotDurationMinutes', {
                      required: 'Выберите длительность слота.',
                      valueAsNumber: true,
                    })}
                    error={Boolean(errors.slotDurationMinutes)}
                    helperText={errors.slotDurationMinutes?.message}
                  >
                    {slotDurationOptions.map((minutes) => (
                      <MenuItem key={minutes} value={minutes}>
                        {minutes} минут
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    label="Время начала"
                    type="time"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register('startTime', {
                      required: 'Укажите время начала.',
                    })}
                    error={Boolean(errors.startTime)}
                    helperText={errors.startTime?.message}
                  />

                  <TextField
                    label="Время окончания"
                    type="time"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register('endTime', {
                      required: 'Укажите время окончания.',
                    })}
                    error={Boolean(errors.endTime)}
                    helperText={errors.endTime?.message}
                  />
                </Stack>

                <TextField
                  label="Ссылка на консультацию"
                  fullWidth
                  {...register('meetingLink', {
                    required: 'Введите ссылку на встречу.',
                    validate: (value) =>
                      value.trim().length > 0 || 'Введите ссылку на встречу.',
                  })}
                  error={Boolean(errors.meetingLink)}
                  helperText={errors.meetingLink?.message}
                />

                <TextField
                  label="Описание консультации"
                  fullWidth
                  multiline
                  minRows={4}
                  {...register('description')}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting || (isEditMode && !isDirty)}
                    sx={{
                      minHeight: 48,
                      px: 3,
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontSize: '16px',
                      fontWeight: 600,
                      backgroundColor: '#A61D0A',
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: '#8F1708',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {isSubmitting
                      ? isEditMode
                        ? 'Сохранение...'
                        : 'Создание...'
                      : isEditMode
                        ? 'Сохранить'
                        : 'Создать консультацию'}
                  </Button>

                  {isEditMode ? (
                    <Button
                      type="button"
                      variant="outlined"
                      disabled={isSubmitting}
                      onClick={handleCancelEdit}
                      sx={{
                        minHeight: 48,
                        px: 3,
                        borderRadius: '10px',
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: 600,
                      }}
                    >
                      Отменить
                    </Button>
                  ) : null}
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Card>

        <Card elevation={0} sx={sectionCardStyles}>
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography
              sx={{
                fontSize: { xs: '22px', sm: '24px' },
                fontWeight: 700,
                lineHeight: 1.2,
                mb: 3,
              }}
            >
              Созданные консультации
            </Typography>

            <Stack spacing={2.5}>
              {isMyConsultationsLoading ? (
                <Typography color="text.secondary">Загрузка консультаций...</Typography>
              ) : null}

              {isMyConsultationsError ? (
                <Alert severity="error">Не удалось загрузить ваши консультации.</Alert>
              ) : null}

              {!isMyConsultationsLoading &&
              !isMyConsultationsError &&
              sortedConsultations.length === 0 ? (
                <Typography color="text.secondary">
                  У вас пока нет созданных консультаций.
                </Typography>
              ) : null}

              {sortedConsultations.map((consultation) => {
                const canManage = canManageConsultation(consultation);

                return (
                  <Card
                    key={consultation.id}
                    elevation={0}
                    sx={{
                      borderRadius: '14px',
                      border: '1px solid #E5E7EB',
                      boxShadow: 'none',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                      <Stack spacing={2}>
                        <Stack
                          direction={{ xs: 'column', md: 'row' }}
                          spacing={2}
                          justifyContent="space-between"
                          alignItems={{ xs: 'flex-start', md: 'flex-start' }}
                        >
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography
                              sx={{
                                fontSize: { xs: '18px', sm: '20px' },
                                fontWeight: 700,
                                lineHeight: 1.2,
                                wordBreak: 'break-word',
                                overflowWrap: 'anywhere',
                              }}
                            >
                              {consultation.subject}
                            </Typography>

                            {consultation.description ? (
                              <Typography
                                sx={{
                                  mt: 1,
                                  color: 'text.secondary',
                                  wordBreak: 'break-word',
                                  overflowWrap: 'anywhere',
                                }}
                              >
                                {consultation.description}
                              </Typography>
                            ) : null}
                          </Box>

                          <Box>
                            <Typography sx={{ fontWeight: 600 }}>
                              Свободно: {consultation.slotsAvailable}/{consultation.slotsTotal}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', mt: 0.5 }}>
                              Забронировано: {consultation.slotsBooked}
                            </Typography>
                          </Box>
                        </Stack>

                        <Stack spacing={0.75}>
                          <Typography color="text.secondary">
                            Дата: {formatDate(consultation.startsAt)}
                          </Typography>

                          <Typography color="text.secondary">
                            Время: {formatTimeRange(consultation.startsAt, consultation.endsAt)}
                          </Typography>

                          <Typography color="text.secondary">
                            Длительность слота: {consultation.slotDurationMinutes} мин
                          </Typography>

                          <Typography
                            color="text.secondary"
                            sx={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                          >
                            Ссылка: {consultation.meetingLink}
                          </Typography>
                        </Stack>

                        {!canManage ? (
                          <Alert severity="warning">
                            Эту консультацию нельзя редактировать или удалить. Причина: она уже
                            началась или в ней есть забронированные слоты.
                          </Alert>
                        ) : null}

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                          <Button
                            variant="outlined"
                            disabled={!canManage || isSubmitting || isDeleting}
                            onClick={() => handleStartEdit(consultation)}
                            sx={{
                              minHeight: 44,
                              borderRadius: '10px',
                              textTransform: 'none',
                              fontWeight: 600,
                            }}
                          >
                            Редактировать
                          </Button>

                          <Button
                            variant="contained"
                            color="error"
                            disabled={!canManage || isSubmitting || isDeleting}
                            onClick={() => setConsultationToDelete(consultation)}
                            sx={{
                              minHeight: 44,
                              borderRadius: '10px',
                              textTransform: 'none',
                              fontWeight: 600,
                            }}
                          >
                            Удалить
                          </Button>
                        </Stack>
                      </Stack>
                    </Box>
                  </Card>
                );
              })}
            </Stack>
          </Box>
        </Card>
      </Stack>

      <Dialog
        open={Boolean(consultationToDelete)}
        onClose={isDeleting ? undefined : () => setConsultationToDelete(null)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Удалить консультацию?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            После удаления консультацию нельзя будет вернуть. Вы уверены?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setConsultationToDelete(null)}
            disabled={isDeleting}
            sx={{ textTransform: 'none' }}
          >
            Нет
          </Button>

          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
            sx={{ textTransform: 'none' }}
          >
            {isDeleting ? 'Удаление...' : 'Да'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { TeacherConsultationCreate };
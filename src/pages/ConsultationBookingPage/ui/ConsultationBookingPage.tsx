import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  useBookSlotMutation,
  useGetConsultationByIdQuery,
  useGetConsultationSlotsQuery,
  type BookSlotPayload,
} from 'entities/Consultation';
import { paths } from 'app/providers/router/paths';

const RED_COLOR = '#941B0C';
const TEXT_SECONDARY = '#4B5563';
const DESCRIPTION_BG = '#E5E7EB';

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

const getTeacherDisplayName = (teacherName: string) => {
  const parts = teacherName.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0];

  const lastName = parts[0];
  const firstInitial = parts[1]?.[0]?.toUpperCase() ?? '';
  const middleInitial = parts[2]?.[0]?.toUpperCase() ?? '';

  const initials = [firstInitial, middleInitial].filter(Boolean).join('.');

  return initials ? `${lastName} ${initials}.` : lastName;
};

const getAvatarInitials = (teacherName: string) => {
  const parts = teacherName.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '';

  const first = parts[1]?.[0]?.toUpperCase() ?? '';
  const second = (parts[2]?.[0] ?? parts[0]?.[0] ?? '').toUpperCase();

  return [first, second].filter(Boolean).join('.');
};

const getApiErrorMessage = (error: unknown) => {
  if (!error || typeof error !== 'object') {
    return 'Не удалось выполнить запись.';
  }

  if ('data' in error && error.data && typeof error.data === 'object') {
    const data = error.data as { message?: string | string[] };

    if (Array.isArray(data.message)) {
      return data.message.join(', ');
    }

    if (typeof data.message === 'string' && data.message.trim().length > 0) {
      return data.message;
    }
  }

  return 'Не удалось выполнить запись.';
};

const ConsultationBookingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const consultationId = Number(id);
  const isValidConsultationId = Number.isInteger(consultationId) && consultationId > 0;

  const {
    data: consultation,
    isLoading: isConsultationLoading,
    isError: isConsultationError,
    refetch: refetchConsultation,
  } = useGetConsultationByIdQuery(consultationId, {
    skip: !isValidConsultationId,
  });

  const {
    data: slots,
    isLoading: isSlotsLoading,
    isError: isSlotsError,
    refetch: refetchSlots,
  } = useGetConsultationSlotsQuery(consultationId, {
    skip: !isValidConsultationId,
  });

  const [bookSlot, { isLoading: isBooking }] = useBookSlotMutation();

  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [slotError, setSlotError] = useState('');
  const [resultModal, setResultModal] = useState<{
    open: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({
    open: false,
    type: 'success',
    title: '',
    message: '',
  });

  const openResultModal = (type: 'success' | 'error', title: string, message: string) => {
    setResultModal({
      open: true,
      type,
      title,
      message,
    });
  };

  const closeResultModal = () => {
    setResultModal((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookSlotPayload>({
    defaultValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      group: '',
    },
  });

  const availableSlots = useMemo(() => {
    return (slots ?? []).filter((slot) => !slot.isBooked);
  }, [slots]);

  const onSubmit = handleSubmit(async (values) => {
    setResultModal((prev) => ({
      ...prev,
      open: false,
    }));

    if (!selectedSlotId) {
      setSlotError('Выберите время консультации.');
      return;
    }

    setSlotError('');

    try {
      const result = await bookSlot({
        slotId: Number(selectedSlotId),
        body: {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          middleName: values.middleName?.trim() || undefined,
          email: values.email.trim(),
          group: values.group.trim(),
        },
      }).unwrap();

      reset();
      setSelectedSlotId('');

      openResultModal(
        'success',
        'Запись подтверждена',
        `Вы успешно записаны на консультацию "${result.subject}" на время ${formatTimeRange(
          result.startsAt,
          result.endsAt,
        )}. Ссылка на консультацию отправлена на вашу почту.`,
      );

      await Promise.all([refetchConsultation(), refetchSlots()]);
    } catch (error) {
      openResultModal('error', 'Ошибка записи', getApiErrorMessage(error));
    }
  });

  if (!isValidConsultationId) {
    return (
      <Stack spacing={3} sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <Button
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={() => navigate(paths.consultations())}
          sx={{
            alignSelf: 'flex-start',
            color: RED_COLOR,
            textTransform: 'none',
            fontWeight: 600,
            p: 0,
          }}
        >
          Назад
        </Button>

        <Alert severity="error">Некорректный id консультации.</Alert>
      </Stack>
    );
  }

  if (isConsultationLoading || isSlotsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isConsultationError || !consultation) {
    return (
      <Stack spacing={3} sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <Button
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={() => navigate(paths.consultations())}
          sx={{
            alignSelf: 'flex-start',
            color: RED_COLOR,
            textTransform: 'none',
            fontWeight: 600,
            p: 0,
          }}
        >
          Назад
        </Button>

        <Alert severity="error">Не удалось загрузить консультацию.</Alert>
      </Stack>
    );
  }

  return (
    <>
      <Stack spacing={4} sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <Button
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={() => navigate(paths.consultations())}
          sx={{
            alignSelf: 'flex-start',
            color: RED_COLOR,
            textTransform: 'none',
            fontWeight: 600,
            p: 0,
          }}
        >
          Назад
        </Button>

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            alignItems: 'stretch',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Card
            elevation={0}
            sx={{
              flex: { xs: '1 1 auto', md: '0 0 320px' },
              borderRadius: '14px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
              px: 3,
              py: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Stack spacing={2.5} alignItems="center" sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 110,
                  height: 110,
                  borderRadius: '50%',
                  backgroundColor: RED_COLOR,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                  fontWeight: 700,
                }}
              >
                {getAvatarInitials(consultation.teacherName)}
              </Box>

              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: '#111111',
                }}
              >
                {getTeacherDisplayName(consultation.teacherName)}
              </Typography>
            </Stack>
          </Card>

          <Card
            elevation={0}
            sx={{
              flex: 1,
              borderRadius: '14px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
              px: 3,
              py: 3,
            }}
          >
            <Stack spacing={3}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '28px',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: '#111111',
                  }}
                >
                  {consultation.subject}
                </Typography>

                <Typography
                  sx={{
                    color: consultation.slotsAvailable > 0 ? '#15803D' : RED_COLOR,
                    fontSize: '18px',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Свободно: {consultation.slotsAvailable}/{consultation.slotsTotal}
                </Typography>
              </Box>

              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1.25} alignItems="center">
                  <CalendarTodayOutlinedIcon sx={{ color: RED_COLOR, fontSize: 22 }} />
                  <Typography
                    sx={{
                      color: TEXT_SECONDARY,
                      fontSize: '18px',
                      lineHeight: 1.2,
                    }}
                  >
                    {formatDate(consultation.startsAt)}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1.25} alignItems="center">
                  <AccessTimeOutlinedIcon sx={{ color: RED_COLOR, fontSize: 22 }} />
                  <Typography
                    sx={{
                      color: TEXT_SECONDARY,
                      fontSize: '18px',
                      lineHeight: 1.2,
                    }}
                  >
                    {formatTimeRange(consultation.startsAt, consultation.endsAt)}
                  </Typography>
                </Stack>
              </Stack>

              <Box
                sx={{
                  backgroundColor: DESCRIPTION_BG,
                  borderRadius: '12px',
                  px: 2.5,
                  py: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#111111',
                    mb: 1,
                  }}
                >
                  Описание консультации
                </Typography>

                <Typography
                  sx={{
                    fontSize: '16px',
                    lineHeight: 1.5,
                    color: TEXT_SECONDARY,
                  }}
                >
                  {consultation.description?.trim() || 'Описание отсутствует.'}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Box>

        <Card
          elevation={0}
          sx={{
            borderRadius: '14px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
            px: { xs: 2, md: 4 },
            py: { xs: 3, md: 4 },
          }}
        >
          <Stack spacing={3}>
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '24px',
                fontWeight: 700,
                color: '#111111',
              }}
            >
              Запись на консультацию
            </Typography>

            {isSlotsError && <Alert severity="error">Не удалось загрузить доступное время.</Alert>}

            <Box component="form" onSubmit={onSubmit}>
              <Stack spacing={2.5}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 2,
                  }}
                >
                  <TextField
                    label="Имя"
                    fullWidth
                    {...register('firstName', {
                      required: 'Введите имя',
                      maxLength: {
                        value: 60,
                        message: 'Максимум 60 символов',
                      },
                    })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />

                  <TextField
                    label="Фамилия"
                    fullWidth
                    {...register('lastName', {
                      required: 'Введите фамилию',
                      maxLength: {
                        value: 60,
                        message: 'Максимум 60 символов',
                      },
                    })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                </Box>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 2,
                  }}
                >
                  <TextField
                    label="Отчество"
                    fullWidth
                    {...register('middleName', {
                      maxLength: {
                        value: 60,
                        message: 'Максимум 60 символов',
                      },
                    })}
                    error={!!errors.middleName}
                    helperText={errors.middleName?.message}
                  />

                  <TextField
                    label="Почта"
                    type="email"
                    fullWidth
                    {...register('email', {
                      required: 'Введите email',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Введите корректный email',
                      },
                      maxLength: {
                        value: 120,
                        message: 'Максимум 120 символов',
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Box>

                <TextField
                  label="Группа"
                  fullWidth
                  {...register('group', {
                    required: 'Введите группу',
                    maxLength: {
                      value: 50,
                      message: 'Максимум 50 символов',
                    },
                  })}
                  error={!!errors.group}
                  helperText={errors.group?.message}
                />

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 260px' },
                    gap: 2,
                    alignItems: 'start',
                  }}
                >
                  <FormControl fullWidth error={!!slotError}>
                    <Select
                      displayEmpty
                      value={selectedSlotId}
                      onChange={(event) => {
                        setSelectedSlotId(event.target.value);
                        setSlotError('');
                      }}
                      renderValue={(value) => {
                        if (!value) return 'Выберите время';

                        const currentSlot = availableSlots.find(
                          (slot) => String(slot.id) === String(value),
                        );

                        return currentSlot
                          ? formatTimeRange(currentSlot.startsAt, currentSlot.endsAt)
                          : 'Выберите время';
                      }}
                    >
                      {availableSlots.length === 0 ? (
                        <MenuItem disabled value="">
                          Свободных интервалов нет
                        </MenuItem>
                      ) : (
                        availableSlots.map((slot) => (
                          <MenuItem key={slot.id} value={String(slot.id)}>
                            {formatTimeRange(slot.startsAt, slot.endsAt)}
                          </MenuItem>
                        ))
                      )}
                    </Select>

                    {slotError ? <FormHelperText>{slotError}</FormHelperText> : null}
                  </FormControl>

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={availableSlots.length === 0 || isBooking}
                    sx={{
                      minHeight: 56,
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontSize: '16px',
                      fontWeight: 700,
                      backgroundColor: RED_COLOR,
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: RED_COLOR,
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {isBooking ? 'Запись...' : 'Записаться'}
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Card>
      </Stack>

      <Dialog open={resultModal.open} onClose={closeResultModal} fullWidth maxWidth="xs">
        <DialogTitle
          sx={{
            color: resultModal.type === 'success' ? '#15803D' : RED_COLOR,
            fontWeight: 700,
            fontSize: '24px',
          }}
        >
          {resultModal.title}
        </DialogTitle>

        <DialogContent>
          <Typography
            sx={{
              color: TEXT_SECONDARY,
              fontSize: '16px',
              lineHeight: 1.5,
            }}
          >
            {resultModal.message}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={closeResultModal}
            variant="contained"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              backgroundColor: RED_COLOR,
              '&:hover': {
                backgroundColor: RED_COLOR,
              },
            }}
          >
            Понятно
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConsultationBookingPage;

import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import { useGetConsultationsQuery } from 'entities/Consultation';

const RED_COLOR = '#941B0C';
const GREEN_COLOR = '#15803D';
const TEXT_SECONDARY = '#4B5563';

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

const ConsultationsPage = () => {
  const { data, isLoading, isError } = useGetConsultationsQuery();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Alert severity="error">Не удалось загрузить список консультаций.</Alert>;
  }

  return (
    <Stack spacing={3} sx={{ maxWidth: 1100, mx: 'auto', width: '100%' }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Список консультаций
        </Typography>
      </Box>

      {!data || data.length === 0 ? (
        <Typography color="text.secondary">Сейчас доступных консультаций нет.</Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, minmax(0, 1fr))',
            },
            gap: 3,
          }}
        >
          {data.map((consultation) => {
            const isAvailable = consultation.slotsAvailable > 0;
            const availabilityColor = isAvailable ? GREEN_COLOR : RED_COLOR;

            return (
              <Card
                key={consultation.id}
                elevation={0}
                sx={{
                  borderRadius: '14px',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
                  backgroundColor: '#FFFFFF',
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ pt: '10px', pr: '10px', textAlign: 'right' }}>
                  <Typography
                    sx={{
                      color: availabilityColor,
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    Свободно: {consultation.slotsAvailable}/{consultation.slotsTotal}
                  </Typography>
                </Box>

                <Box sx={{ px: '30px', pt: '14px' }}>
                  <Stack direction="row" spacing={2.5} alignItems="center">
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        minWidth: 64,
                        borderRadius: '50%',
                        backgroundColor: RED_COLOR,
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        fontWeight: 700,
                      }}
                    >
                      {getAvatarInitials(consultation.teacherName)}
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          color: '#000000',
                          fontSize: '24px',
                          fontWeight: 700,
                          lineHeight: 1.2,
                        }}
                      >
                        {consultation.subject}
                      </Typography>

                      <Typography
                        sx={{
                          mt: '6px',
                          color: TEXT_SECONDARY,
                          fontSize: '18px',
                          lineHeight: 1.2,
                        }}
                      >
                        {getTeacherDisplayName(consultation.teacherName)}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Box sx={{ px: '30px', pt: '30px' }}>
                  <Stack spacing={1.25}>
                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <CalendarTodayOutlinedIcon sx={{ color: RED_COLOR, fontSize: 20 }} />
                      <Typography
                        sx={{
                          color: TEXT_SECONDARY,
                          fontSize: '16px',
                          lineHeight: 1.2,
                        }}
                      >
                        {formatDate(consultation.startsAt)}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <AccessTimeOutlinedIcon sx={{ color: RED_COLOR, fontSize: 20 }} />
                      <Typography
                        sx={{
                          color: TEXT_SECONDARY,
                          fontSize: '16px',
                          lineHeight: 1.2,
                        }}
                      >
                        {formatTimeRange(consultation.startsAt, consultation.endsAt)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>

                <Box sx={{ px: '30px', pt: '30px', pb: '30px' }}>
                  <Button
                    fullWidth
                    variant="contained"
                    disabled={!isAvailable}
                    sx={{
                      minHeight: 48,
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontSize: '16px',
                      fontWeight: 600,
                      backgroundColor: RED_COLOR,
                      '&:hover': {
                        backgroundColor: RED_COLOR,
                      },
                    }}
                  >
                    Записаться
                  </Button>
                </Box>
              </Card>
            );
          })}
        </Box>
      )}
    </Stack>
  );
};

export default ConsultationsPage;
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { paths } from 'app/providers/router/paths';
import aboutHeroImage from 'shared/assets/images/about/about-hero.png';

const RED_COLOR = '#941B0C';
const TEXT_SECONDARY = '#4B5563';
const PAGE_BG = '#F5F5F5';

const aboutItems = [
  'Система создана для удобной записи студентов на консультации',
  'Студенты могут выбрать наиболее удобное время',
  'Преподаватели могут легко создавать и управлять консультациями',
  'Упрощение коммуникации между студентами и преподавателями',
];

const steps = [
  {
    icon: <EventNoteRoundedIcon sx={{ fontSize: 52, color: RED_COLOR }} />,
    title: 'Преподаватель создает консультацию',
    description:
      'Преподаватель указывает предмет, дату, время и интервал приема, создавая доступные слоты для записи.',
  },
  {
    icon: <SearchRoundedIcon sx={{ fontSize: 52, color: RED_COLOR }} />,
    title: 'Студент выбирает консультацию',
    description:
      'Студент просматривает список доступных консультаций и выбирает подходящую по предмету и времени.',
  },
  {
    icon: <TaskAltRoundedIcon sx={{ fontSize: 52, color: RED_COLOR }} />,
    title: 'Запись на удобное время',
    description:
      'Студент заполняет форму записи и бронирует свободное время, получая подтверждение.',
  },
];

const benefits = [
  {
    icon: <BoltRoundedIcon sx={{ fontSize: 24, color: RED_COLOR }} />,
    title: 'Быстрая запись',
    description: 'Запись на консультацию занимает всего несколько кликов',
  },
  {
    icon: <CalendarMonthRoundedIcon sx={{ fontSize: 24, color: RED_COLOR }} />,
    title: 'Удобное расписание',
    description: 'Четкое отображение всех доступных времен для консультаций',
  },
  {
    icon: <PersonRoundedIcon sx={{ fontSize: 24, color: RED_COLOR }} />,
    title: 'Простота для преподавателей',
    description: 'Интуитивный интерфейс для создания и управления консультациями',
  },
  {
    icon: <ScheduleRoundedIcon sx={{ fontSize: 24, color: RED_COLOR }} />,
    title: 'Экономия времени',
    description: 'Автоматизация процесса записи экономит время всех участников',
  },
];

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: PAGE_BG }}>
      <Container maxWidth={false} sx={{ maxWidth: '1440px', py: { xs: 6, md: 10 } }}>
        <Stack spacing={{ xs: 8, md: 12 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1.05fr 0.95fr' },
              gap: { xs: 4, md: 6 },
              alignItems: 'center',
            }}
          >
            <Stack spacing={4}>
              <Typography
                sx={{
                  fontSize: { xs: '34px', md: '48px' },
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: '#111827',
                  whiteSpace: 'pre-line',
                }}
              >
                {'Платформа записи на\nконсультации\nпреподавателей'}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '22px', md: '30px' },
                  fontWeight: 400,
                  lineHeight: 1.35,
                  color: TEXT_SECONDARY,
                  maxWidth: '760px',
                }}
              >
                Современная система, которая позволяет студентам быстро и удобно
                записываться на консультации к преподавателям, оптимизируя учебный
                процесс.
              </Typography>

              <Box>
                <Button
                  variant="contained"
                  onClick={() => navigate(paths.consultations())}
                  sx={{
                    minHeight: 56,
                    px: 4,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontSize: '18px',
                    fontWeight: 700,
                    backgroundColor: RED_COLOR,
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: RED_COLOR,
                      boxShadow: 'none',
                    },
                  }}
                >
                  Посмотреть консультации
                </Button>
              </Box>
            </Stack>

            <Box
              sx={{
                width: '100%',
                minHeight: { xs: 300, md: 500 },
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
                backgroundColor: '#E5E7EB',
              }}
            >
              <Box
                component="img"
                src={aboutHeroImage}
                alt="Платформа записи на консультации"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
              px: { xs: 3, md: 5 },
              py: { xs: 4, md: 5 },
            }}
          >
            <Stack spacing={4} alignItems="center" textAlign="center">
              <Typography
                sx={{
                  fontSize: '36px',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: '#111827',
                }}
              >
                О платформе
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '20px', md: '24px' },
                  fontWeight: 400,
                  lineHeight: 1.45,
                  color: TEXT_SECONDARY,
                  maxWidth: '980px',
                }}
              >
                Наша платформа создана для упрощения процесса записи студентов на
                консультации с преподавателями. Система объединяет удобство современных
                технологий с потребностями академической среды.
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  gap: 3,
                }}
              >
                {aboutItems.map((item) => (
                  <Stack
                    key={item}
                    direction="row"
                    spacing={1.5}
                    alignItems="flex-start"
                    sx={{
                      backgroundColor: '#FAFAFA',
                      borderRadius: '16px',
                      px: 2,
                      py: 2,
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        color: RED_COLOR,
                        fontSize: 28,
                        mt: '2px',
                        flexShrink: 0,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: { xs: '18px', md: '22px' },
                        lineHeight: 1.4,
                        color: '#111827',
                      }}
                    >
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            </Stack>
          </Box>

          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography
              sx={{
                fontSize: { xs: '30px', md: '36px' },
                fontWeight: 700,
                lineHeight: 1.2,
                color: '#111827',
              }}
            >
              Как это работает
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '20px', md: '24px' },
                fontWeight: 400,
                lineHeight: 1.4,
                color: TEXT_SECONDARY,
                maxWidth: '900px',
              }}
            >
              Простой и понятный процесс записи на консультации в три шага
            </Typography>
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
              gap: 3,
            }}
          >
            {steps.map((step) => (
              <Card
                key={step.title}
                elevation={0}
                sx={{
                  borderRadius: '20px',
                  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.08)',
                  px: 3,
                  py: 4,
                  height: '100%',
                }}
              >
                <Stack spacing={2.5} alignItems="center" textAlign="center">
                  <Box
                    sx={{
                      width: 88,
                      height: 88,
                      borderRadius: '50%',
                      backgroundColor: '#FCE8E6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {step.icon}
                  </Box>

                  <Typography
                    sx={{
                      fontSize: '24px',
                      fontWeight: 700,
                      lineHeight: 1.25,
                      color: '#111827',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: '18px',
                      lineHeight: 1.45,
                      color: TEXT_SECONDARY,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Stack>
              </Card>
            ))}
          </Box>

          <Box
            sx={{
              backgroundColor: '#F3F4F6',
              borderRadius: '24px',
              px: { xs: 2, md: 4 },
              py: { xs: 5, md: 7 },
            }}
          >
            <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 5 }}>
              <Typography
                sx={{
                  fontSize: { xs: '30px', md: '36px' },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: '#111827',
                }}
              >
                Преимущества платформы
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '18px', md: '24px' },
                  lineHeight: 1.4,
                  color: TEXT_SECONDARY,
                }}
              >
                Почему стоит выбрать нашу систему для организации консультаций
              </Typography>
            </Stack>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, minmax(0, 1fr))',
                  lg: 'repeat(4, minmax(0, 1fr))',
                },
                gap: 3,
              }}
            >
              {benefits.map((benefit) => (
                <Card
                  key={benefit.title}
                  elevation={0}
                  sx={{
                    borderRadius: '18px',
                    boxShadow: '0 8px 18px rgba(0, 0, 0, 0.12)',
                    px: 3,
                    py: 4,
                    minHeight: 220,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <Stack spacing={2.5} alignItems="center" textAlign="center">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: '#FCE8E6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {benefit.icon}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: '20px',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: '#111827',
                      }}
                    >
                      {benefit.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: '16px',
                        lineHeight: 1.5,
                        color: TEXT_SECONDARY,
                      }}
                    >
                      {benefit.description}
                    </Typography>
                  </Stack>
                </Card>
              ))}
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutPage;
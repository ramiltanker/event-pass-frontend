import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
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
import heroImage from 'shared/assets/images/main/main-hero.png';

const RED_COLOR = '#941B0C';
const TEXT_SECONDARY = '#4B5563';
const LIGHT_BG = '#F5F5F5';

const howItWorksItems = [
  {
    icon: <ListAltRoundedIcon sx={{ fontSize: 28, color: RED_COLOR }} />,
    title: '1. Выберите консультацию',
    description:
      'Просмотрите список доступных консультаций и выберите подходящую тему',
  },
  {
    icon: <InsertDriveFileRoundedIcon sx={{ fontSize: 28, color: RED_COLOR }} />,
    title: '2. Откройте страницу консультации',
    description:
      'Ознакомьтесь с подробным описанием, форматом и длительностью встречи',
  },
  {
    icon: <CalendarMonthRoundedIcon sx={{ fontSize: 28, color: RED_COLOR }} />,
    title: '3. Запишитесь через форму',
    description:
      'Заполните простую форму и получите подтверждение на вашу почту',
  },
];

const benefitsItems = [
  {
    icon: <CalendarMonthRoundedIcon sx={{ fontSize: 22, color: RED_COLOR }} />,
    title: 'Удобная запись',
    description: 'Простая форма записи без лишних шагов',
  },
  {
    icon: <ContactMailRoundedIcon sx={{ fontSize: 22, color: RED_COLOR }} />,
    title: 'Подтверждение на почту',
    description: 'Получите все детали консультации на email',
  },
  {
    icon: <StarRoundedIcon sx={{ fontSize: 22, color: RED_COLOR }} />,
    title: 'Актуальные консультации',
    description: 'Только проверенные и востребованные темы',
  },
  {
    icon: <ForumRoundedIcon sx={{ fontSize: 22, color: RED_COLOR }} />,
    title: 'Понятный формат',
    description: 'Четкая структура и комфортное общение',
  },
];

const faqItems = [
  {
    question: 'Как записаться на консультацию?',
    answer:
      'Выберите интересующую консультацию из списка, откройте страницу с подробным описанием и заполните форму записи. Процесс займет не более 2 минут.',
  },
  {
    question: 'Что будет после отправки формы?',
    answer:
      'После отправки формы вы получите автоматическое подтверждение на указанную электронную почту. В течение 24 часов с вами свяжется наш специалист для уточнения деталей.',
  },
  {
    question: 'Как приходит подтверждение?',
    answer:
      'Подтверждение приходит на вашу электронную почту с подробной информацией о консультации: дата, время, ссылка на онлайн-встречу и контактные данные специалиста.',
  },
  {
    question: 'Можно ли выбрать удобное время?',
    answer:
      'Да, в форме записи вы можете указать предпочтительное время и дату. Мы постараемся подобрать удобный для вас вариант и согласуем финальное время встречи.',
  },
];

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: '#FFFFFF' }}>
      <Container maxWidth={false} sx={{ maxWidth: '1440px', py: { xs: 6, md: 10 } }}>
        <Stack spacing={{ xs: 9, md: 12 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1.05fr 0.95fr' },
              gap: { xs: 5, md: 8 },
              alignItems: 'center',
            }}
          >
            <Stack spacing={4} sx={{ maxWidth: '620px' }}>
              <Typography
                sx={{
                  fontSize: { xs: '38px', md: '64px' },
                  fontWeight: 700,
                  lineHeight: 1.05,
                  color: '#111827',
                  whiteSpace: 'pre-line',
                }}
              >
                {'Запишитесь на\nпрофессиональную\nконсультацию\nонлайн'}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '18px', md: '24px' },
                  lineHeight: 1.45,
                  color: TEXT_SECONDARY,
                  maxWidth: '560px',
                }}
              >
                Получите экспертную помощь в удобное время. Простая запись,
                подтверждение на почту и качественная консультация.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => navigate(paths.consultations())}
                  sx={{
                    minHeight: 54,
                    px: 4,
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 700,
                    backgroundColor: RED_COLOR,
                    boxShadow: '0 8px 18px rgba(148, 27, 12, 0.28)',
                    '&:hover': {
                      backgroundColor: RED_COLOR,
                      boxShadow: '0 8px 18px rgba(148, 27, 12, 0.28)',
                    },
                  }}
                >
                  Смотреть консультации
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => navigate(paths.about())}
                  sx={{
                    minHeight: 54,
                    px: 4,
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#111827',
                    borderColor: '#D1D5DB',
                    '&:hover': {
                      borderColor: '#D1D5DB',
                      backgroundColor: '#F9FAFB',
                    },
                  }}
                >
                  О нас
                </Button>
              </Stack>
            </Stack>

            <Box
              sx={{
                width: '100%',
                maxWidth: '560px',
                ml: { xs: 0, lg: 'auto' },
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 16px 30px rgba(0, 0, 0, 0.16)',
                backgroundColor: '#E5E7EB',
              }}
            >
              <Box
                component="img"
                src={heroImage}
                alt="Онлайн консультация"
                sx={{
                  width: '100%',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />
            </Box>
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
                fontSize: { xs: '18px', md: '20px' },
                lineHeight: 1.4,
                color: TEXT_SECONDARY,
              }}
            >
              Три простых шага к вашей консультации
            </Typography>
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
              gap: 3,
            }}
          >
            {howItWorksItems.map((item) => (
              <Card
                key={item.title}
                elevation={0}
                sx={{
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  px: 3,
                  py: 4,
                  textAlign: 'center',
                }}
              >
                <Stack spacing={2.5} alignItems="center">
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: '12px',
                      backgroundColor: '#FCE8E6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: '#111827',
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: '16px',
                      lineHeight: 1.5,
                      color: TEXT_SECONDARY,
                    }}
                  >
                    {item.description}
                  </Typography>
                </Stack>
              </Card>
            ))}
          </Box>

          <Box
            sx={{
              backgroundColor: LIGHT_BG,
              borderRadius: '24px',
              px: { xs: 2, md: 4 },
              py: { xs: 6, md: 8 },
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
                Почему выбирают нас
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '18px', md: '20px' },
                  lineHeight: 1.4,
                  color: TEXT_SECONDARY,
                }}
              >
                Преимущества нашего сервиса
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
              {benefitsItems.map((item) => (
                <Card
                  key={item.title}
                  elevation={0}
                  sx={{
                    borderRadius: '18px',
                    backgroundColor: '#FFFFFF',
                    px: 3,
                    py: 4,
                    textAlign: 'center',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
                    minHeight: 220,
                  }}
                >
                  <Stack spacing={2.5} alignItems="center">
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        backgroundColor: '#FCE8E6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </Box>

                    <Typography
                      sx={{
                        fontSize: '20px',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: '#111827',
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: '16px',
                        lineHeight: 1.5,
                        color: TEXT_SECONDARY,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Stack>
                </Card>
              ))}
            </Box>
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
              Часто задаваемые вопросы
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '18px', md: '20px' },
                lineHeight: 1.4,
                color: TEXT_SECONDARY,
              }}
            >
              Ответы на популярные вопросы о консультациях
            </Typography>
          </Stack>

          <Stack spacing={2.5} sx={{ maxWidth: '980px', mx: 'auto', width: '100%' }}>
            {faqItems.map((item) => (
              <Card
                key={item.question}
                elevation={0}
                sx={{
                  borderRadius: '14px',
                  border: '1px solid #E5E7EB',
                  px: { xs: 2, md: 3 },
                  py: { xs: 2.5, md: 3 },
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <HelpRoundedIcon
                    sx={{
                      color: RED_COLOR,
                      fontSize: 22,
                      mt: '2px',
                      flexShrink: 0,
                    }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontSize: '18px',
                        fontWeight: 700,
                        lineHeight: 1.35,
                        color: '#111827',
                        mb: 1,
                      }}
                    >
                      {item.question}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: '16px',
                        lineHeight: 1.55,
                        color: TEXT_SECONDARY,
                      }}
                    >
                      {item.answer}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>

      <Box
        sx={{
          mt: { xs: 8, md: 10 },
          py: { xs: 8, md: 10 },
          px: 2,
          background: 'linear-gradient(135deg, #941B0C 0%, #7A1609 100%)',
        }}
      >
        <Container maxWidth={false} sx={{ maxWidth: '1440px' }}>
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography
              sx={{
                fontSize: { xs: '32px', md: '48px' },
                fontWeight: 700,
                lineHeight: 1.15,
                color: '#FFFFFF',
              }}
            >
              Готовы начать свой путь к успеху?
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '18px', md: '24px' },
                lineHeight: 1.45,
                color: '#FFFFFF',
                maxWidth: '900px',
              }}
            >
              Запишитесь на консультацию прямо сейчас и получите профессиональную
              поддержку в достижении ваших целей
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate(paths.consultations())}
              sx={{
                mt: 1,
                minHeight: 56,
                px: 5,
                borderRadius: '10px',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 700,
                color: RED_COLOR,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 10px 22px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 10px 22px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              Перейти к консультациям
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default MainPage;
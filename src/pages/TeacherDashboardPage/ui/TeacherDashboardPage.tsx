import { Box, Stack, Typography } from '@mui/material';
import { TeacherConsultationCreate } from 'widgets/TeacherConsultationCreate';
import { TeacherProfileCard } from 'widgets/TeacherProfileCard';

const TeacherDashboardPage = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Личный кабинет преподавателя
          </Typography>
        </Box>

        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={3}
          alignItems="flex-start"
        >
          <Box
            sx={{
              width: { xs: '100%', lg: 280 },
              flexShrink: 0,
            }}
          >
            <TeacherProfileCard />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
            <TeacherConsultationCreate />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TeacherDashboardPage;
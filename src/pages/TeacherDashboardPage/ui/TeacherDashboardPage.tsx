import { Box, Stack, Typography } from '@mui/material';
import { TeacherConsultationCreate } from 'widgets/TeacherConsultationCreate';

const TeacherDashboardPage = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Личный кабинет преподавателя
          </Typography>

        </Box>

        <TeacherConsultationCreate />
      </Stack>
    </Box>
  );
};

export default TeacherDashboardPage;
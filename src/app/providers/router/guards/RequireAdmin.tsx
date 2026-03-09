import { Navigate, Outlet } from 'react-router-dom';
import { selectUser, UserRole } from 'entities/User';
import { Routes } from '../paths';
import { useAppSelector } from 'shared/lib/hooks';

const RequireAdmin = () => {
  const user = useAppSelector(selectUser);

  if (!user) {
    return <Navigate to={Routes.LOGIN} replace />;
  }

  if (user.role !== UserRole.ADMIN) {
    return <Navigate to={Routes.ROOT} replace />;
  }

  return <Outlet />;
};

export default RequireAdmin;

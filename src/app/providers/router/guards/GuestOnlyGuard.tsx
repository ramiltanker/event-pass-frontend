import { Navigate, Outlet } from 'react-router-dom';

import { Routes } from 'app/providers/router';
import { selectIsAuthenticated } from 'entities/User';
import { useAppSelector } from 'shared/lib/hooks';

const GuestOnlyGuard = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={Routes.ROOT} replace />;
  }

  return <Outlet />;
};

export { GuestOnlyGuard };

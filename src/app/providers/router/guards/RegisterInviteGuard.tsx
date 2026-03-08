import { selectInviteEmail, selectInviteToken } from 'entities/Invite';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'shared/lib/hooks';
import { Routes } from '../paths';

export const RegisterInviteGuard = () => {
  const inviteEmail = useAppSelector(selectInviteEmail);
  const inviteToken = useAppSelector(selectInviteToken);

  if (!inviteToken || !inviteEmail) {
    return <Navigate to={Routes.ROOT} replace />;
  }

  return <Outlet />;
};

import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuthed } from '../hooks';

export function RequireAuth() {
  const isAuthed = useIsAuthed();

  if (!isAuthed) return <Navigate to="/login" replace />;

  return <Outlet />;
}

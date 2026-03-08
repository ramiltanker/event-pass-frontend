import { ResetPasswordForm } from 'features/ResetPasswordForm';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();

  const token = useMemo(() => searchParams.get('token') ?? '', [searchParams]);

  return <ResetPasswordForm token={token} />;
};

export { ResetPasswordPage };

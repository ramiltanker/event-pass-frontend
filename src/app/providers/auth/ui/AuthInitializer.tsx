import { useEffect, type ReactNode } from 'react';

import { clearAuthStorage, useLazyGetMeQuery, userActions } from 'entities/User';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { selectAccessToken, selectIsUserInitialized } from 'entities/User';

interface Props {
  children: ReactNode;
}

const AuthInitializer = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAccessToken);
  const isInitialized = useAppSelector(selectIsUserInitialized);

  const [getMe] = useLazyGetMeQuery();

  useEffect(() => {
    const init = async () => {
      if (!accessToken) {
        dispatch(userActions.setInitialized(true));
        return;
      }

      try {
        const user = await getMe().unwrap();
        dispatch(userActions.setUser(user));
      } catch {
        clearAuthStorage();
        dispatch(userActions.clearAuthData());
      } finally {
        dispatch(userActions.setInitialized(true));
      }
    };

    if (!isInitialized) {
      void init();
    }
  }, [accessToken, dispatch, getMe, isInitialized]);

  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
};

export { AuthInitializer };

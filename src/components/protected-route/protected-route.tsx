import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

function ProtectedRoute({
  children,
  onlyOnAuth = false
}: { onlyOnAuth?: boolean } & PropsWithChildren) {
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);

  if (!onlyOnAuth && !user)
    return <Navigate to='/login' replace state={{ from: location }} />;

  if (onlyOnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  if (status === 'pending') return <Preloader />;

  return children;
}

export default ProtectedRoute;

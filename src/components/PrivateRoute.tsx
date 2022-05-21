import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/authProvider';

const PrivateRoute = ({ children }: { children: any }) => {
  const { authUser } = useAuth();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;

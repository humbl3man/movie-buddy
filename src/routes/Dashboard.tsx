import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../auth/authProvider';

const Dashboard = () => {
  const { authUser } = useContext(AuthContext);

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1 className="h3">Welcome, {authUser.email}</h1>
      <p>Email verified: {String(authUser.emailVerified)}</p>
    </div>
  );
};

export default Dashboard;

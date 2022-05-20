import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../auth/authProvider';

const StyledDashboardContainer = styled.section`
  margin-top: 8rem;
`;
const StyledEmailVerificationWarning = styled.div`
  border: 1px solid var(--warning700);
  background: var(--warning800);
  padding: 1.4rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  p {
    color: var(--warning200);
  }
`;

const StyledAuthError = styled.div`
  background: var(--error500);
  color: var(--white);
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Dashboard = () => {
  const { authUser, authError, signOut, verifyEmail } = useContext(AuthContext);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleVerifyEmailClick = () => {
    verifyEmail(authUser, () => {
      setVerificationSent(true);
    });
  };

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return (
    <StyledDashboardContainer>
      <h1 className="h2">Welcome</h1>
      {authError && <StyledAuthError>{authError}</StyledAuthError>}
      {!authUser.emailVerified && !verificationSent && (
        <StyledEmailVerificationWarning>
          <p>You haven't verified your email.</p>
          <button className="btn btn--small btn--warning" onClick={handleVerifyEmailClick}>
            Verify
          </button>
        </StyledEmailVerificationWarning>
      )}
      {verificationSent && (
        <StyledEmailVerificationWarning>
          <p>Verification email sent. Please check your email!</p>
        </StyledEmailVerificationWarning>
      )}

      <button className="btn" onClick={signOut}>
        Logout
      </button>
    </StyledDashboardContainer>
  );
};

export default Dashboard;

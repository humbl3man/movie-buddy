import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../auth/authProvider';

const StyledDashboardContainer = styled.section`
  margin-top: 8rem;
`;

const StyledAuthWarning = styled.div`
  background: var(--warning500);
  color: var(--warning900);
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  button,
  .btn {
    appearance: none;
    padding: 0;
    border: 0;
    color: var(--warning900);
    font-weight: 600;
    background: transparent;
    font-family: inherit;
    font-size: inherit;
    &:hover,
    &:focus {
      background: transparent;
      text-decoration: underline;
    }
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
  const { authUser, authError, signOut, verifyEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleVerifyEmailClick = () => {
    setIsLoading(true);
    verifyEmail(
      authUser,
      () => {
        setVerificationSent(true);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      }
    );
  };

  return (
    <StyledDashboardContainer>
      <h1 className="h2">Welcome</h1>
      {authError && <StyledAuthError>{authError}</StyledAuthError>}
      {!authUser?.emailVerified && !verificationSent && (
        <StyledAuthWarning style={{ maxWidth: 'max-content' }}>
          Please verify your email address.{' '}
          <button className="btn btn--small" onClick={handleVerifyEmailClick} disabled={isLoading}>
            Send verification email
          </button>
        </StyledAuthWarning>
      )}
      {verificationSent && <p>Verification email sent! Please check your inbox to verify!</p>}

      <button className="btn" onClick={signOut} disabled={isLoading}>
        Logout
      </button>
    </StyledDashboardContainer>
  );
};

export default Dashboard;

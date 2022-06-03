import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsPencil as EditIcon } from 'react-icons/bs';

import { useAuth } from '../../state/auth/authProvider';
import { StyledAuthError, StyledAuthWarning } from '../../styles/page/dashboard.styles';
import { Button, ButtonLink } from '../common/Button.component';
import { buttonSizes } from '../common/Button.types';

const DashboardHome = () => {
  const { authUser, authError, verifyEmail } = useAuth();
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
    <>
      <h1 className="h2">
        Welcome
        {authUser?.displayName && (
          <span style={{ color: 'var(--primary200)' }}>
            , {authUser.displayName}{' '}
            <Link
              title="Update name"
              to="update-name"
              style={{
                display: 'inline-block',
                marginLeft: '1rem',
                fontSize: '3rem'
              }}>
              <EditIcon />
            </Link>
          </span>
        )}
      </h1>
      {authError && <StyledAuthError>{authError}</StyledAuthError>}
      {!authUser?.emailVerified && !verificationSent && (
        <StyledAuthWarning style={{ maxWidth: 'max-content' }}>
          <p>
            Please verify your email address.{' '}
            <Button size={buttonSizes.SMALL} onClick={handleVerifyEmailClick} disabled={isLoading}>
              Send verification email
            </Button>
          </p>
        </StyledAuthWarning>
      )}
      {verificationSent && <p>Verification email sent! Please check your inbox to verify!</p>}
      {!authUser?.displayName && (
        <StyledAuthWarning style={{ maxWidth: 'max-content' }}>
          <p>
            Consider adding display name to your profile{' '}
            <ButtonLink size={buttonSizes.SMALL} to="update-name">
              Add Name
            </ButtonLink>
          </p>
        </StyledAuthWarning>
      )}
    </>
  );
};

export default DashboardHome;

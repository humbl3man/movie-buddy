import { Navigate } from 'react-router-dom';

import { useAuth } from '../state/auth/authProvider';
import loginSplashSrc from '../assets/login-splash.svg';
import { StyledContainer, StyledSplashImage } from '../styles/page/account.styles';
import AuthForm from '../components/auth/authForm.component';

const Account: React.FC<{ type: 'create' | 'login' }> = (props) => {
  const { authUser } = useAuth();

  if (authUser) {
    return <Navigate to="/account/dashboard" replace />;
  }

  return (
    <StyledContainer>
      <StyledSplashImage>
        <img src={loginSplashSrc} width={486} height={584} alt="" />
      </StyledSplashImage>
      <AuthForm type={props.type} />
    </StyledContainer>
  );
};

export default Account;

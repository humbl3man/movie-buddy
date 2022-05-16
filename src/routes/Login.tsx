import styled from 'styled-components';

import loginSplashSrc from '../assets/login-splash-image.png';
import emailIcon from '../assets/email.svg';
import passIcon from '../assets/password.svg';

const StyledLoginPage = styled.section`
  display: grid;

  @media screen and (min-width: 767px) {
    grid-template-columns: minmax(300px, 1fr) 1fr;
    grid-gap: 12.6rem;
  }
`;

const StyledLoginFormContainer = styled.div`
  display: flex;
  align-items: center;
  @media screen and (min-width: 767px) {
    padding-right: 4.2rem;
  }

  form {
    width: 100%;
  }
  .field input {
    display: block;
    width: 100%;
  }
`;

const StyledLoginImage = styled.div`
  display: none;
  @media screen and (min-width: 767px) {
    display: block;
    img {
      display: block;
      max-width: 100%;
      height: auto;
    }
  }
`;

const Login = () => {
  return (
    <StyledLoginPage>
      <StyledLoginImage>
        <img src={loginSplashSrc} width={486} height={584} alt="" />
      </StyledLoginImage>
      <StyledLoginFormContainer>
        <form>
          <h1>Login</h1>
          <div className="field field--withIcon">
            <div className="field-icon">
              <img src={emailIcon} alt="" />
            </div>
            <input id="email" type="email" placeholder=" " />
            <label htmlFor="email">Email</label>
          </div>
          <div className="field field--withIcon">
            <div className="field-icon">
              <img src={passIcon} alt="" />
            </div>
            <input id="passwod" type="password" placeholder=" " />
            <label htmlFor="password">Password</label>
          </div>
        </form>
      </StyledLoginFormContainer>
    </StyledLoginPage>
  );
};

export default Login;

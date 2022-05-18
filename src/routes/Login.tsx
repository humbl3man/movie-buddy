import styled from 'styled-components';

import loginSplashSrc from '../assets/login-splash-image.png';
import emailIcon from '../assets/email.svg';
import passIcon from '../assets/password.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';

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

type LoginInputs = {
  email: string;
  password: string;
};

const emailRgx = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gm;

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields }
  } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    // TODO: add logic here to authenticate
    console.log('data', data);
  };
  const [emailValue, passwordValue] = watch(['email', 'password']);

  return (
    <StyledLoginPage>
      <StyledLoginImage>
        <img src={loginSplashSrc} width={486} height={584} alt="" />
      </StyledLoginImage>
      <StyledLoginFormContainer>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1>Login</h1>
          <div className="field field--withIcon">
            <label htmlFor="email" className={`${emailValue ? 'raised' : ''}`}>
              Email
            </label>
            <div className="field-icon">
              <img src={emailIcon} alt="" />
            </div>
            <input
              id="email"
              type="email"
              className={errors?.email?.message ? 'error' : ''}
              {...register('email', {
                required: 'Please enter email address',
                pattern: {
                  value: emailRgx,
                  message: 'Please enter valid email address'
                }
              })}
            />
            {errors.email?.message && <div className="field-error">{errors.email.message}</div>}
          </div>
          <div className="field field--withIcon">
            <label htmlFor="password" className={`${passwordValue ? 'raised' : ''}`}>
              Password
            </label>
            <div className="field-icon">
              <img src={passIcon} alt="" />
            </div>
            <input
              id="password"
              type="password"
              className={errors?.password?.message ? 'error' : ''}
              {...register('password', {
                required: 'Please enter password',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />
            {errors.password?.message && <div className="field-error">{errors.password.message}</div>}
          </div>
          <button className="btn">Login</button>
        </form>
      </StyledLoginFormContainer>
    </StyledLoginPage>
  );
};

export default Login;

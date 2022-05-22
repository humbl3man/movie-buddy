import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../auth/authProvider';

const StyledFormContainer = styled.div`
  max-width: 500px;
  margin: auto;

  form {
    width: 100%;
  }
  .field input {
    display: block;
    width: 100%;
  }
`;

const StyledSplashImage = styled.div`
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

const StyledAuthError = styled.div`
  background: var(--error500);
  color: var(--white);
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const StyledFooterMessage = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

type FormInputs = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const emailRgx = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gm;

const PasswordReset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { authError, authUser, resetPassword } = useAuth();
  const [reset, setReset] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors }
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setIsLoading(true);
    resetPassword(
      data.email,
      () => {
        setReset(true);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      }
    );
  };
  const location = useLocation();
  const [emailValue] = watch(['email']);

  if (authUser) {
    return <Navigate to="/dashboard" replace />;
  }

  useEffect(() => {
    clearErrors();
  }, [location]);

  if (reset) {
    return (
      <StyledFormContainer>
        <h1>Reset Password</h1>
        <p>
          <strong>Success!</strong> Reset email sent. If provided email is registered in our system, you will receive an email with reset link.
        </p>
      </StyledFormContainer>
    );
  }

  return (
    <StyledFormContainer>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>Reset Password</h1>
        {authError && <StyledAuthError>{authError}</StyledAuthError>}
        <div className="field">
          <label htmlFor="email" className={`${emailValue ? 'raised' : ''}`}>
            Email
          </label>
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

        <button className="btn btn--wide" disabled={isLoading}>
          Reset Password
        </button>
      </form>
    </StyledFormContainer>
  );
};

export default PasswordReset;

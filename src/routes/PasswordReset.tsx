import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdEmail as EmailIcon } from 'react-icons/md';
import { CgArrowLongLeft as BackArrow } from 'react-icons/cg';

import { useAuth } from '../state/auth/authProvider';

const StyledFormContainer = styled.div`
  max-width: 600px;
  margin: 6rem auto 0 auto;

  form {
    width: 100%;
  }
  .field input {
    display: block;
    width: 100%;
  }
`;

const StyledAuthError = styled.div`
  background: var(--error500);
  color: var(--white);
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const StyledNotification = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 1rem;
  align-items: center;
  svg {
    margin-right: 4px;
  }
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
  const [resetRequested, setResetRequested] = useState(false);
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
        setResetRequested(true);
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
    return <Navigate to="/account/dashboard" replace />;
  }

  useEffect(() => {
    clearErrors();
  }, [location]);

  if (resetRequested) {
    return (
      <StyledFormContainer>
        <h1>Email sent!</h1>
        <StyledNotification>
          <div>
            <EmailIcon
              style={{
                width: '46px',
                height: '46px',
                color: 'var(--warning500)'
              }}
            />
          </div>
          <p>Check your inbox for an email with a password reset link.</p>
        </StyledNotification>
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
        <Link
          className="btn btn--wide btn--link"
          to="/account/login"
          style={{
            marginTop: '2rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <BackArrow />
          &nbsp; Go Back To Login
        </Link>
      </form>
    </StyledFormContainer>
  );
};

export default PasswordReset;

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation, Link } from 'react-router-dom';
import { FcGoogle as GoogleLogo } from 'react-icons/fc';

import emailIcon from '../../assets/email.svg';
import passIcon from '../../assets/password.svg';
import { useAuth } from '../../state/auth/authProvider';
import { StyledAuthError, StyledFooterMessage } from './authForm.styles';
import { Button } from '../common/Button.component';
import { buttonVariants } from '../common/Button.types';
import { StyledFormContainer } from './authForm.styles';

type FormInputs = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const emailRgx = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gm;

type AuthFormProps = {
  type: 'create' | 'login';
};

const AuthForm: React.FC<AuthFormProps> = (props) => {
  const { signIn, createUser, authError, signInWithGooglePopup } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors }
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (user) => {
    setIsLoading(true);
    if (props.type === 'login') {
      signIn(
        user,
        () => setIsLoading(false),
        () => setIsLoading(false)
      );
    } else {
      createUser(
        user,
        () => setIsLoading(false),
        () => setIsLoading(false)
      );
    }
  };
  const handleGoogleSignIn = () => {
    signInWithGooglePopup().then((response: any) => {
      console.log(response);
    });
  };
  const [emailValue, passwordValue, passwordConfirmValue] = watch(['email', 'password', 'passwordConfirm']);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    clearErrors();
  }, [location]);

  return (
    <StyledFormContainer>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>{props.type === 'login' ? 'Login' : 'Create Account'}</h1>
        {authError && <StyledAuthError>{authError}</StyledAuthError>}

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
              minLength:
                props.type === 'create'
                  ? {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  : undefined
            })}
          />
          {errors.password?.message && <div className="field-error">{errors.password.message}</div>}
        </div>
        {props.type === 'create' && (
          <div className="field field--withIcon">
            <label htmlFor="passwordConfirm" className={`${passwordConfirmValue ? 'raised' : ''}`}>
              Confirm Password
            </label>
            <div className="field-icon">
              <img src={passIcon} alt="" />
            </div>
            <input
              id="passwordConfirm"
              type="password"
              className={errors?.passwordConfirm?.message ? 'error' : ''}
              {...register('passwordConfirm', {
                required: 'Please confirm password',
                validate: {
                  matchPassword: (value) => value === passwordValue || "Passwords don't match"
                }
              })}
            />
            {errors.passwordConfirm?.message && <div className="field-error">{errors.passwordConfirm.message}</div>}
          </div>
        )}

        <Button type="submit" fullWidth disabled={isLoading}>
          {props.type === 'login' ? 'Login' : 'Create Account'}
        </Button>
        {/* Google Sign-In */}
        {props.type === 'login' && (
          <Button type="button" fullWidth variant={buttonVariants.GOOGLE} onClick={handleGoogleSignIn}>
            <GoogleLogo />
            <span>Sign In With Google</span>
          </Button>
        )}
        <StyledFooterMessage>
          {props.type === 'login' ? (
            <>
              <p>
                Don't have an account? <Link to="/account/register">Create Account</Link>
              </p>
              <p>
                Forgot your password? <Link to="/account/password-reset">Reset</Link>
              </p>
            </>
          ) : (
            <p>
              Already have an account? <Link to="/account/login">Sign In</Link>
            </p>
          )}
        </StyledFooterMessage>
      </form>
    </StyledFormContainer>
  );
};

export default AuthForm;

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { CgArrowLongLeft as BackArrow } from 'react-icons/cg';

import { useAuth } from '../../auth/authProvider';
import { StyledAuthError } from '../../styles/dashboard.styles';

const StyledFormContainer = styled.div`
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

const UpdateName = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { authUser, authError, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    formState: { errors }
  } = useForm<{ displayName: string }>();
  const [displayName] = watch(['displayName']);
  const onSubmit: SubmitHandler<{ displayName: string }> = (data) => {
    setIsLoading(true);
    updateUserProfile(
      { displayName: data.displayName },
      () => {
        setIsLoading(false);
        reset();
        navigate('/account/dashboard');
      },
      () => {
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    clearErrors();
  }, [location]);

  return (
    <StyledFormContainer
      style={{
        maxWidth: '600px',
        margin: 'auto'
      }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>Update Name</h1>
        {authError && <StyledAuthError>{authError}</StyledAuthError>}
        <div className="field">
          <label htmlFor="displayName" className={`${displayName ? 'raised' : ''}`}>
            Name
          </label>

          <input
            id="displayName"
            type="text"
            className={errors?.displayName?.message ? 'error' : ''}
            {...register('displayName', {
              value: authUser?.displayName ?? '',
              required: 'Please enter name',
              minLength: {
                value: 2,
                message: 'Your name must be at least 2 characters long'
              },
              maxLength: {
                value: 20,
                message: 'Your name must not exceed 20 characters'
              }
            })}
          />
          {errors.displayName?.message && <div className="field-error">{errors.displayName?.message}</div>}
        </div>
        <button type="submit" className="btn btn--wide" disabled={isLoading}>
          Update
        </button>
        <Link
          className="btn btn--wide btn--link"
          to="/account/dashboard"
          style={{
            marginTop: '2rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <BackArrow />
          &nbsp; Go Back To Account Page
        </Link>
      </form>
    </StyledFormContainer>
  );
};

export default UpdateName;

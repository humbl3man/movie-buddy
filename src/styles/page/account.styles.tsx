import styled from 'styled-components';

export const StyledContainer = styled.section`
  display: grid;

  @media screen and (min-width: 767px) {
    grid-template-columns: minmax(300px, 1fr) 1fr;
    grid-gap: 12.6rem;
  }
`;

export const StyledFormContainer = styled.div`
  display: flex;
  align-items: center;

  form {
    width: 100%;
  }
  .field input {
    display: block;
    width: 100%;
  }
`;

export const StyledSplashImage = styled.div`
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

export const StyledAuthError = styled.div`
  background: var(--error500);
  color: var(--white);
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

export const StyledFooterMessage = styled.div`
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid var(--grey700);
  text-align: center;
`;

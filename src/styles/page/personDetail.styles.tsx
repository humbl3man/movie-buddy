import styled from 'styled-components';

export const StyledPersonDetailContainer = styled.div`
  margin-top: 6rem;
  display: grid;
  gap: 6rem;
  @media screen and (min-width: 640px) {
    grid-template-columns: 320px 1fr;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 500px 1fr;
  }
`;

export const StyledPersonImage = styled.div`
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    @media screen and (min-width: 640px) {
      max-width: 320px;
    }
    @media screen and (min-width: 1024px) {
      max-width: 500px;
    }
  }
`;

export const StyledPersonContent = styled.div`
  .text-block:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
`;

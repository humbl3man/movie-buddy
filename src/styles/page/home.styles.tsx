import styled from 'styled-components';

export const StyledHero = styled.div`
  width: 100%;
  margin-top: 8rem;
  @media screen and (min-width: 767px) {
    max-width: 600px;
  }
  p {
    color: var(--grey300);
  }
  .search-wrapper {
    margin-bottom: 8rem;
  }
`;

export const StyledFeaturedContainer = styled.div`
  margin-top: 2.4rem;
  margin-bottom: 15.6rem;
`;

export const StyledFeaturedResults = styled.div`
  margin-top: 4rem;
  .featured-title {
    color: var(--grey400);
    margin-bottom: 5rem;
  }
`;

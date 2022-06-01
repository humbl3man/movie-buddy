import styled from 'styled-components';

export const StyledContentList = styled.section`
  display: grid;
  grid-gap: 3.2rem;
  grid-template-columns: repeat(2, 1fr);
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

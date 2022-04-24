import React from 'react';
import styled from 'styled-components';

const StyledHero = styled.div`
  width: 100%;
  @media screen and (min-width: 767px) {
    max-width: 600px;
  }
  p {
    color: var(--grey300);
  }
`;

const Home = () => {
  return (
    <StyledHero>
      <h1>MoviePal</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo voluptatum assumenda repellendus est sunt delectus architecto voluptate fugit quae molestias.</p>
    </StyledHero>
  );
};

export default Home;

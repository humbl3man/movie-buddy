import { useState } from 'react';
import styled from 'styled-components';
import logoImg from './assets/logo.svg';

const StyledPage = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: var(--maxWidth);
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  width: 100%;
`;

function App() {
  return (
    <StyledPage>
      <img src={logoImg} alt="" />
      <h1>Movie Recommendation App</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni excepturi quidem necessitatibus ipsam sed modi aliquam vero! A explicabo, quod laborum maxime in,
        perspiciatis eligendi ex odit voluptatum molestiae sit!
      </p>
    </StyledPage>
  );
}

export default App;

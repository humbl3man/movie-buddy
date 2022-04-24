import { useState } from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';

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
      <Navbar />
    </StyledPage>
  );
}

export default App;

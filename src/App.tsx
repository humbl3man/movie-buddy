import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/common/Navbar.component';

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
      <Outlet />
    </StyledPage>
  );
}

export default App;

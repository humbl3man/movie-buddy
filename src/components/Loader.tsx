import styled from 'styled-components';

const StyledLoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: var(--primary800);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  color: var(--primary100);
`;

const Loader = (props: { children: React.ReactNode }) => {
  return <StyledLoadingScreen>{props.children}</StyledLoadingScreen>;
};

export default Loader;

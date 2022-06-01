import styled from 'styled-components';

export const StyledCard = styled.article<{ hasImage: boolean }>`
  position: relative;
  z-index: 1;
  padding: 0.8rem;
  background: rgba(32, 40, 62, 0.8);
  border-radius: 12px;
  height: 100%;
  transition: background 500ms ease;
  ${(props) =>
    props.hasImage
      ? `
  
    &:hover img {
      transform: scale(1.02);
    }

  `
      : ''}
  &:hover {
    background: var(--grey700);
  }
`;

export const StyledCardImageContainer = styled.div`
  overflow: hidden;
  border-radius: 8px;

  img {
    max-width: 400px;
    width: 100%;
    height: auto;
    display: block;
    transition: transform 1s ease;
  }
`;

export const StyledCardBody = styled.section`
  p {
    color: var(--grey50);
    padding-left: 0.8rem;
    margin-top: 2.4rem;
  }
`;

export const StyledRating = styled.div`
  background-color: var(--black65);
  color: var(--warning500);
  left: 16px;
  top: 18px;
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  p {
    margin: 0 0 0 0.4rem;
    color: var(--warning500);
  }
`;

export const StyledWatchlistButton = styled.button`
  position: absolute;
  z-index: 100;
  top: -16px;
  right: -6px;
  font-size: 1.4rem;
  font-weight: 600;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);
`;

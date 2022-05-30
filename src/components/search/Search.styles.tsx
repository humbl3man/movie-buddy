import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledSearchWrapper = styled.div`
  position: relative;
`;

export const StyledSearchResults = styled.div`
  background: var(--grey100);
  margin-top: 2rem;
  border-radius: 8px;
  max-height: 500px;
  overflow-y: auto;
`;
export const StyledSearchResult = styled.div`
  padding: 1.4rem;
  color: var(--grey900);
  display: block;

  display: flex;
  align-items: center;

  img {
    width: 100%;
    max-width: 42px;
    height: auto;
    margin-right: 1.2rem;
    display: block;
  }
`;
export const StyledXButton = styled.button<{ visible: boolean }>`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  z-index: 2;
  appearance: none;
  border: 0;
  background: none;
  cursor: pointer;
  ${(props) => {
    if (!props.visible) {
      return `
        visibility: hidden;
        z-index: -1;
        pointer-events: none;
      `;
    }
    return '';
  }}
  svg {
    width: 38px;
    height: 38px;
  }
  &:hover svg path {
    stroke: var(--primary500);
  }
`;

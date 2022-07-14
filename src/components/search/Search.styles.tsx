import styled from 'styled-components';

export const StyledSearchWrapper = styled.div`
  position: relative;
`;

export const StyledSearch = styled.div`
  .search-input {
    border: 2px solid var(--grey400);
    height: 46px;
    border-radius: 8px;
    background: var(--black10);
    font-size: inherit;
    color: var(--grey100);
    min-width: 300px;
    display: block;
    width: 100%;
    padding: 0.5rem 4rem 0.5rem 5.2rem;

    &::placeholder {
      color: var(--grey300);
    }

    @media screen and (min-width: 1024px) {
      &::placeholder {
        color: var(--grey500);
      }
    }

    &:focus {
      border-color: var(--primary500);
      outline: 2px solid var(--primary500);
      outline-offset: 1px;
    }
  }
  .search-icon {
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    left: 1.6rem;
    width: 22px;
    height: 22px;
  }
`;

export const StyledSearchResults = styled.div`
  background: var(--grey100);
  margin-top: 0.5rem;
  min-width: 370px;
  max-height: 400px;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 100;
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
  right: 4px;
  transform: translateY(-50%);
  z-index: 2;
  appearance: none;
  border: 0;
  background: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
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
    width: 28px;
    height: 28px;
  }
  &:hover svg path {
    stroke: var(--primary500);
  }
`;

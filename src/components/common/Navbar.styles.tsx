import styled from 'styled-components';

export const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
  padding-top: 2rem;
  position: relative;
  z-index: 100;
  /* overflow-y: hidden; */

  .menuToggle,
  .menuClose {
    appearance: none;
    border: 0;
    background: transparent;
    padding: 0.5rem;
    cursor: pointer;
    svg {
      width: 3.4rem;
      height: 3.4rem;
    }

    @media screen and (min-width: 767px) {
      display: none;
    }
  }

  .menuToggle {
    color: var(--grey200);
    &:hover,
    &:focus {
      color: var(--white);
    }
  }

  .menuClose {
    display: flex;
    margin-left: auto;
    align-items: center;
    justify-content: center;
    font-size: 2.7rem;
    line-height: 1;
    svg path {
      stroke: var(--grey50);
    }
    @media screen and (min-width: 767px) {
      display: none;
    }
  }

  @media screen and (min-width: 767px) {
    margin-left: -2rem;
    margin-right: -2rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

type StyledNavProps = {
  isOpen: boolean;
};
export const StyledNavWrapper = styled.div<StyledNavProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--primary800);
  padding: 2rem;
  ${(prop) => {
    if (prop.isOpen) {
      return `
        visibility: visible;
        z-index: 101;
      `;
    }
    return `
      visibility: hidden;
      z-index: -1;
    `;
  }}
  @media screen and (min-width: 767px) {
    visibility: visible !important;
    position: static;
    width: auto;
    height: auto;
    background: transparent;
    padding: 0;
  }
`;
export const StyledNavLinks = styled.nav`
  ul {
    margin: 2rem 0 0;
    padding: 0;
    @media screen and (min-width: 767px) {
      margin: 0;
      display: flex;
      align-items: center;
      list-style: none;
    }
  }
  li {
    display: block;
    margin-left: 0;
    margin-bottom: 3.2rem;
    @media screen and (min-width: 767px) {
      display: inline-block;
      margin-bottom: 0;
      margin-left: 3.2rem;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  a,
  li:not(.nav-search) button {
    width: 100%;
    color: var(--grey200);
    text-decoration: none;
    font-weight: 600;
    letter-spacing: 0.02em;
    display: inline-flex;
    align-items: center;
    &:hover,
    &:focus,
    &:active,
    &.active {
      color: var(--white);
    }
    svg {
      display: inline-block;
      margin-right: 0.8rem;
    }
    &:hover svg path,
    &:focus svg path,
    &:active svg path,
    &.active svg path {
      stroke: var(--white);
    }
  }

  li:not(.nav-search) button {
    appearance: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    border: 0;
    padding: 0;
    cursor: pointer;
  }
`;

export const StyledWatchlistCount = styled.span<{ doubleDigits: boolean; over99: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  background-color: var(--primary100);
  color: var(--primary900);
  width: 25px;
  height: 25px;
  border-radius: 50%;
  ${(props) =>
    props.doubleDigits
      ? `
  
    font-size: 1.3rem;
  
  `
      : ''}
  ${(props) =>
    props.over99
      ? `
      width: 30px;
    font-size: 1.1rem;
  `
      : ''}
`;

export const StyledAvatarImage = styled.img`
  max-width: 34px;
  display: inline-block;
  margin-left: 1rem;
  border-radius: 50%;
`;

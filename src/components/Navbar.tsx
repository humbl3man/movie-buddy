import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../assets/logo.svg';

const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
  padding-top: 2rem;
  position: relative;
  z-index: 100;
  overflow-y: hidden;

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
    svg path {
      fill: var(--grey200);
    }
    &:hover svg path {
      fill: var(--white);
    }
  }

  .menuClose {
    display: flex;
    margin-left: auto;
    align-items: center;
    justify-content: center;
    font-size: 3.4rem;
    color: var(--grey200);
    line-height: 1;
    @media screen and (min-width: 767px) {
      display: none;
    }
  }

  @media screen and (min-width: 767px) {
    margin-left: -2rem;
    margin-right: -2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    background: var(--grey900);
  }
`;

type StyledNavProps = {
  isOpen: boolean;
};
const StyledNavWrapper = styled.div<StyledNavProps>`
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
const StyledNavLinks = styled.nav`
  ul {
    list-style: none;
    margin: 2rem 0 0;
    padding: 0;
    @media screen and (min-width: 767px) {
      margin: 0;
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
      &:last-child {
        margin-left: 4.8rem;
      }
    }
  }
  a {
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
      margin-left: 0.8rem;
    }
    &:hover svg path,
    &:focus svg path,
    &:active svg path,
    &.active svg path {
      stroke: var(--white);
    }
  }
`;

const RightArrowSvg = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.4297 5.93005L20.4997 12.0001L14.4297 18.0701" stroke="#8E95A9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 12H20.33" stroke="#8E95A9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
const MenuIconSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.97 384.97">
      <path
        fill="white"
        d="M12.03 84.212h360.909c6.641 0 12.03-5.39 12.03-12.03 0-6.641-5.39-12.03-12.03-12.03H12.03C5.39 60.152 0 65.541 0 72.182c0 6.641 5.39 12.03 12.03 12.03zM372.939 180.455H12.03c-6.641 0-12.03 5.39-12.03 12.03s5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03s-5.389-12.03-12.03-12.03zM372.939 300.758H12.03c-6.641 0-12.03 5.39-12.03 12.03 0 6.641 5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.03-12.03z"
      />
    </svg>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <StyledHeader>
      <Link to="/">
        <img src={logo} width={40} height={40} alt="" aria-hidden />
      </Link>
      <button type="button" className="menuToggle" onClick={openMenu}>
        <MenuIconSvg />
      </button>
      <StyledNavWrapper isOpen={isMenuOpen}>
        <button className="menuClose" onClick={closeMenu}>
          &times;
        </button>
        <StyledNavLinks>
          <ul>
            <li>
              <Link to="movies" onClick={closeMenu}>
                Movies
              </Link>
            </li>
            <li>
              <Link to="tv" onClick={closeMenu}>
                TV Shows
              </Link>
            </li>
            {/* <li>
              <a href="#">
                Suggest Me <RightArrowSvg />
              </a>
            </li> */}
          </ul>
        </StyledNavLinks>
      </StyledNavWrapper>
    </StyledHeader>
  );
};

export default Navbar;

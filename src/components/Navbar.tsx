import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { HiMenuAlt2 as MenuToggleIcon } from 'react-icons/hi';
import { GrClose as MenuCloseIcon } from 'react-icons/gr';

import logo from '../assets/logo.svg';
import { useAuth } from '../auth/authProvider';

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
      &:last-child {
        margin-left: 4.8rem;
      }
    }
  }
  a,
  button {
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

  button {
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

const RightArrowSvg = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.4297 5.93005L20.4997 12.0001L14.4297 18.0701" stroke="#8E95A9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 12H20.33" stroke="#8E95A9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
const SignOutIcon: React.FC<{ width: number; height: number }> = (props) => {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.4404 14.62L20.0004 12.06L17.4404 9.5" stroke="#767E94" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.75977 12.0601H19.9298" stroke="#767E94" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M11.7598 20C7.33977 20 3.75977 17 3.75977 12C3.75977 7 7.33977 4 11.7598 4"
        stroke="#767E94"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authUser, signOut } = useAuth();

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
        <MenuToggleIcon />
      </button>
      <StyledNavWrapper isOpen={isMenuOpen}>
        <button className="menuClose" onClick={closeMenu}>
          <MenuCloseIcon />
        </button>
        <StyledNavLinks>
          <ul>
            <li>
              <NavLink to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="movies" onClick={closeMenu}>
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink to="tv" onClick={closeMenu}>
                TV Shows
              </NavLink>
            </li>
            {/* <li>
              <a href="#">
                Suggest Me <RightArrowSvg />
              </a>
            </li> */}
            {authUser && (
              <>
                <li>
                  <NavLink to="/account/dashboard" onClick={closeMenu}>
                    Account
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/account/dashboard/watchlist" onClick={closeMenu}>
                    Watchlist
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      signOut();
                      closeMenu();
                    }}>
                    {' '}
                    <SignOutIcon width={16} height={16} /> Log Out
                  </button>
                </li>
              </>
            )}
            {!authUser && (
              <li>
                <NavLink to="/account/login" onClick={closeMenu}>
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </StyledNavLinks>
      </StyledNavWrapper>
    </StyledHeader>
  );
};

export default Navbar;

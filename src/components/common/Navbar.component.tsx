import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiMenuAlt2 as MenuToggleIcon } from 'react-icons/hi';
import { GrClose as MenuCloseIcon } from 'react-icons/gr';

import logo from '../../assets/logo.svg';
import { useAuth } from '../../state/auth/authProvider';
import { StyledHeader, StyledNavWrapper, StyledNavLinks } from './Navbar.styles';

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

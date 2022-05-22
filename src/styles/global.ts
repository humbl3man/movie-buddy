import { createGlobalStyle } from 'styled-components';
import backgroundImg from '../assets/background.svg';

export const GlobalStyle = createGlobalStyle`

  :root {
    // colors
    --black: #000;
    --black75: rgba(0, 0, 0, .75);
    --black65: rgba(0, 0, 0, .65);
    --black50: rgba(0, 0, 0, .5);
    --black40: rgba(0, 0, 0, .4);
    --black30: rgba(0, 0, 0, .3);
    --black20: rgba(0, 0, 0, .2);
    --black10: rgba(0, 0, 0, .1);

    --white: #fff;
    --white75: rgba(255, 255, 255, .75);
    --white65: rgba(255, 255, 255, .65);
    --white50: rgba(255, 255, 255, .5);
    --white40: rgba(255, 255, 255, .4);
    --white30: rgba(255, 255, 255, .3);
    --white20: rgba(255, 255, 255, .2);
    --white10: rgba(255, 255, 255, .1);

    --primary50:  #EBE9FE;
    --primary100: #DEDBFD;
    --primary200: #BEB7FB;
    --primary300: #9C92F8;
    --primary400: #7B6EF6;
    --primary500: #5A4AF4;
    --primary600: #483BC3;
    --primary700: #362C92;
    --primary800: #251E62;
    --primary900: #120F31;

    --secondary50:  #E4F4FF;
    --secondary100: #D2ECFE;
    --secondary200: #A5DBFE;
    --secondary300: #78C8FD;
    --secondary400: #4BB7FD;
    --secondary500: #1EA5FC;
    --secondary600: #1884CA;
    --secondary700: #126297;
    --secondary800: #0C4265;
    --secondary900: #062032;

    --tertary50:  #F6EDFF;
    --tertary100: #F0E2FF;
    --tertary200: #E2C5FF;
    --tertary300: #D3A7FF;
    --tertary400: #C58AFF;
    --tertary500: #B66DFF;
    --tertary600: #9257CC;
    --tertary700: #6D4199;
    --tertary800: #492C66;
    --tertary900: #241633;

    --grey50:  #EBEEF5;
    --grey100: #C3C8D4;
    --grey200: #A8AEBF;
    --grey300: #8E95A9;
    --grey400: #767E94;
    --grey500: #61697F;
    --grey600: #475069;
    --grey700: #323B54;
    --grey800: #20283E;
    --grey900: #121829;

    // TODO: add warning, error, success colors
    --error50:  #FFECEC;
    --error100: #FFDFDF;
    --error200: #FFC0C0;
    --error300: #FFA0A0;
    --error400: #FF8181;
    --error500: #FF6161;
    --error600: #CC4E4E;
    --error700: #993A3A;
    --error800: #662727;
    --error900: #331313;

    --warning50:  #FFF5E9;
    --warning100: #FFEFDB;
    --warning200: #FFDEB6;
    --warning300: #FFCE92;
    --warning400: #FFBD6D;
    --warning500: #FFAD49;
    --warning600: #CC8A3A;
    --warning700: #99682C;
    --warning800: #66451D;
    --warning900: #33230F;

    // typography
    --baseFont: 'Poppins', arial, sans-serif;

    // grid
    --maxWidth: 1440px;
    --gutterWidth: 2.4rem;
  }

  html {
    font-size: 10px;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    font-size: 1.6rem;
    line-height: 2.4rem;
    margin: 0;
    padding: 0; 
    background-image: url(${backgroundImg});
    background-size: 100%;
    background-color: var(--grey900);
    font-family: var(--baseFont);
    overflow-x: hidden;
  }

  // typography   
  h1, .h1 {
    font-size: 6.4rem;
    line-height: 8rem;
  }

  h2, .h2 {
    font-size: 4.8rem;
    line-height: 5.6rem;
  }

  h3, .h3 {
    font-size: 3.2rem;
    line-height: 4rem;
  }

  h4, .h4 {
    font-size: 2.4rem;
    line-height: 3.2rem;
  }

  h5, .h5 {
    font-size: 2rem;
    line-height: 2.4rem;
  }

  h6, .h6 {
    font-size: 1.6rem;
    line-height: 2.4rem;
  }

  h1, 
  h2, 
  h3, 
  .h1,
  .h2,
  .h3 {
    font-weight: 600;
    letter-spacing: -0.02em;
    margin: 0 0 4rem;
  }

  h4, 
  h5, 
  h6,
  .h4,
  .h5,
  .h6 {
    font-weight: 700;
    letter-spacing: -0.015em;
    margin: 0 0 3.2rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6 {
    color: var(--grey50);
  }

  p, a {
    line-height: 2.4rem;
    &.large {
      font-size: 2rem;
      line-height: 3.2rem;
    }
    &.small {
      font-size: 1.4rem;
    }
    &.xSmall { 
      font-size: 1.2rem;
    }
  }
  p {
    color: var(--grey300);
  }
  a {
    color: var(--grey100);
    font-weight: 600;
    transition: color 200ms ease;
    text-decoration: none; 
    &:hover {
      color: var(--white);
    }
  }
  .caption {
    font-size: 1.4rem;
    line-height: 1.6rem;
  }
  a:focus,
  button:focus {
      outline-offset: 2px;
      outline: 2px solid var(--primary200);
  }

  .btn {
    padding: 1.6rem 3.2rem;
    appearance: none;
    border: 0;
    color: var(--white);
    background: var(--primary500);
    font-size: inherit;
    font-weight: inherit;
    border-radius: 12px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    transition: background 200ms ease;

    &:hover,
    &:focus,
    &:active {
      background: var(--primary600);
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    // variations

    // sizes
    &--small {
      padding: 1.2rem 2rem;
    }
    &--wide {
      display: block;
      width: 100%;
    }

    // colors
    &--tertary {
      color: var(--tertary900);
      background: var(--tertary500);
      &:hover,
      &:focus,
      &:active {
        background: var(--tertary600);
      }
    }
    &--warning {
      background: var(--warning500);
      color: var(--warning900);
      &:hover,
      &:focus,
      &:active {
        background: var(--warning600);
      }
    }

  }
  a.btn {
    text-decoration: none;
  }

  // inputs

  .field {

    position: relative;
    margin-bottom: 1.6rem;

    label {
      position: absolute;
      color: var(--grey600);
      user-select: none;
      transition: transform 200ms ease;
      top: 50%;
      transform: translateY(-50%);
      z-index: -1;
      left: 1.6rem;
      &.raised {
        transform: translateY(-3.1rem);
      }
    }

    input {
      border: 2px solid var(--grey600);
      height: 64px;
      border-radius: 12px;
      background: var(--black10);
      font-size: inherit;
      color: var(--grey500);
      min-width: 344px;
      display: block;
      width: 100%;
      padding: 1.2rem 1.6rem;

      &:focus {
        outline-offset: 1px;
        outline-width: 2px;
        outline-style: solid;
      }

      &.error {
        border-color: var(--error500);
      }
      &.error:focus {
        border-color: var(--error500);
        outline-color: var(--error500);
      }
      &:not(.error):focus {
        border-color: var(--primary500);
        outline-color: var(--primary500);
      }
    }

    .field-icon {
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
      left: 1.6rem;
    }

    .field-error {
      color: var(--error500);
      font-size: 1.2rem;
      position: absolute;
      bottom: 0;
      left: 1.6rem;
    }
  }

  .field.field--withIcon {
    label {
      left: 5.6rem;
    }

    input {
      padding: 1.2rem 5.6rem 1.2rem 5.2rem;
    }

  }

`;

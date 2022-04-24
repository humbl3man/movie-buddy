import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  :root {
    // colors
    --black: #000;
    --black75: rgba(0, 0, 0, .75);
    --black65: rgba(0, 0, 0, .65);
    --black50: rgba(0, 0, 0, .5);
    --black40: rgba(0, 0, 0, .4);

    --white: #fff;
    --white75: rgba(255, 255, 255, .75);
    --white65: rgba(255, 255, 255, .65);
    --white50: rgba(255, 255, 255, .5);
    --white40: rgba(255, 255, 255, .4);

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
    color: var(--white);
  }

  p {
    line-height: 2.4rem;
    color: var(--white75);
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

  .caption {
    font-size: 1.4rem;
    line-height: 1.6rem;
  }

  *:focus {
      outline-offset: 4px;
      outline: 2px dashed var(--primary200);
  }

`;

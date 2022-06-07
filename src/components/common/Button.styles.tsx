import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonLinkProps, ButtonProps, buttonSizes, buttonVariants } from './Button.types';

const baseStyles = `
  padding: 1rem 2.4rem;
  line-height: 1;
  appearance: none;
  border: 0;
  font-family: inherit;
  font-size: inherit;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: background 200ms ease;
  font-weight: bold;
  position: relative;
  z-index: 1;
  overflow: hidden;
  font-size: 1.5rem;
  @media screen and (min-width: 1024px) {
    padding: 1.2rem 2.8rem;
  }
`;

function buildStylesFromProps(props: ButtonProps) {
  let styles = baseStyles;
  // sizes
  if (props.size === buttonSizes.SMALL) {
    styles = `
      ${styles}
      font-size: 1.4rem;
    `;
  }
  if (props.size === buttonSizes.XSMALL) {
    styles = `
      ${styles}
      font-size: 1.3rem;
    `;
  }
  // variants
  if (props.variant === buttonVariants.PRIMARY) {
    styles = `
      ${styles}
      background: var(--primary500);
      color: var(--white);
      &:hover,
      &:focus,
      &:active {
        background: var(--primary600);
      }
      &:disabled {
        cursor: not-allowed;
        background: var(--primary400);
      }
    `;
  }
  if (props.variant === buttonVariants.SECONDARY) {
    styles = `
      ${styles}
      background: var(--secondary500);
      color: var(--white);
      &:hover,
      &:focus,
      &:active {
        background: var(--secondary600);
      }
      &:disabled {
        cursor: not-allowed;
        background: var(--secondary400);
      }
    `;
  }
  if (props.variant === buttonVariants.TERTARY) {
    styles = `
      ${styles}
      background: var(--primary500);
      color: var(--white);
      &:hover,
      &:focus,
      &:active {
        background: var(--primary600);
      }
      &:disabled {
        cursor: not-allowed;
        background: var(--primary400);
      }
    `;
  }
  if (props.variant === buttonVariants.DANGER) {
    styles = `
      ${styles}
      background: var(--error500);
      color: var(--white);
      &:hover,
      &:focus,
      &:active {
        background: var(--error600);
      }
      &:disabled {
        background: var(--error400);
      }
    `;
  }
  if (props.variant === buttonVariants.WARNING) {
    styles = `
      ${styles}
      background: var(--warning500);
      color: var(--warning900);
      &:hover,
      &:focus,
      &:active {
        background: var(--warning600);
      }
      &:disabled {
        background: var(--warning400);
      }
    `;
  }
  if (props.variant === buttonVariants.LINK) {
    styles = `
      ${styles}
      background: transparent;
      color: var(--grey100);
      text-decoration: none;
      &:hover,
      &:focus,
      &:active {
        background: transparent;
      }
    `;
  }
  if (props.variant === buttonVariants.GOOGLE) {
    styles = `
      ${styles}
      background: var(--primary50);
      color: var(--grey900);
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      margin-top: 1.6rem;
      svg {
        display: inline-block;
        font-size: 2.6rem;
        margin-right: 1rem;
      }
      &:hover,
      &:focus,
      &:active {
        background: var(--white);
        color: var(--grey900);
      }
    `;
  }

  // wide
  if (props.variant !== buttonVariants.GOOGLE) {
    styles = props.fullWidth
      ? `
      ${styles}
      display: block;
      width: 100%;
    `
      : `
    ${styles}
    ${
      props.withIcon
        ? `      display: flex;
    align-items: center;
    justify-content: center;
      span {
        margin-left: 0.4rem;
      }
    `
        : 'display: inline-block;'
    }
  `;
  }

  return styles;
}

export const StyledButton = styled.button<ButtonProps>`
  ${(props) => buildStylesFromProps(props)}
`;
export const StyledButtonLink = styled(Link)<ButtonLinkProps>`
  ${(props) => buildStylesFromProps(props)}
`;
export const StyledCirleButton = styled.button`
  appearance: none;
  border: 2px solid var(--primary100);
  color: var(--primary100);
  background: var(--grey900);
  border-radius: 50%;
  font-size: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

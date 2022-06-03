import React, { ButtonHTMLAttributes, ComponentPropsWithRef } from 'react';
import styled from 'styled-components';

const baseStyles = `
  padding: 1.6rem 3.2rem;
  appearance: none;
  border: 0;
  font-size: inherit;
  font-weight: inherit;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: background 200ms ease;
`;

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: buttonSizes;
  variant?: buttonVariants;
  fullWidth?: boolean;
}

function buildStylesFromProps(props: IButton) {
  let styles = baseStyles;
  // sizes
  if (props.size === buttonSizes.SMALL) {
    styles = `
      ${styles}
      padding: 1.2rem 1.8rem;
      font-size: 1.5rem;
    `;
  }
  if (props.size === buttonSizes.XSMALL) {
    styles = `
      ${styles}
      padding: 1.2rem 1.8rem;
      font-size: 1.5rem;
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
    display: inline-block;
  `;
  }

  return styles;
}

const StyledButton = styled.button<IButton>`
  ${(props) => buildStylesFromProps(props)}
`;

export enum buttonSizes {
  NORMAL = 'normal',
  SMALL = 'small',
  XSMALL = 'xsmall'
}
export enum buttonVariants {
  PRIMARY = 'primary',
  TERTARY = 'tertary',
  WARNING = 'warning',
  GOOGLE = 'google',
  DANGER = 'danger',
  LINK = 'link'
}

const Button: React.FC<IButton> = (props) => {
  return <StyledButton size={props.size || buttonSizes.NORMAL} variant={props.variant || buttonVariants.PRIMARY} fullWidth={Boolean(props.fullWidth)} {...props} />;
};

export default Button;

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IButton, IButtonLink, buttonSizes, buttonVariants } from './Button.types';

const baseStyles = `
  padding: 1.6rem 3.2rem;
  appearance: none;
  border: 0;
  font-family: inherit;
  font-size: inherit;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: background 200ms ease;
  font-weight: bold;
`;

function buildStylesFromProps(props: IButton | IButtonLink) {
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
      padding: 1rem 1.6rem;
      font-size: 1.4rem;
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
    display: inline-block;
  `;
  }

  return styles;
}

export const StyledButton = styled.button<IButton>`
  ${(props) => buildStylesFromProps(props)}
`;
export const StyledButtonLink = styled(Link)<IButtonLink>`
  ${(props) => buildStylesFromProps(props)}
`;

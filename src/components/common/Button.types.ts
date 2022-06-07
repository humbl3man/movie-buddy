import { ButtonHTMLAttributes } from 'react';
import { LinkProps } from 'react-router-dom';

export enum buttonSizes {
  NORMAL = 'normal',
  SMALL = 'small',
  XSMALL = 'xsmall'
}
export enum buttonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTARY = 'tertary',
  WARNING = 'warning',
  GOOGLE = 'google',
  DANGER = 'danger',
  LINK = 'link'
}

export type ButtonProps = {
  size?: buttonSizes;
  variant?: buttonVariants;
  fullWidth?: boolean;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonLinkProps = ButtonProps & LinkProps;

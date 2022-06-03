import { ButtonHTMLAttributes } from 'react';
import { LinkProps } from 'react-router-dom';

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

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: buttonSizes;
  variant?: buttonVariants;
  fullWidth?: boolean;
}

export interface IButtonLink extends LinkProps {
  size?: buttonSizes;
  variant?: buttonVariants;
  fullWidth?: boolean;
}

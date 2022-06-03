import React from 'react';
import { StyledButton, StyledButtonLink } from './Button.styles';
import { IButton, buttonSizes, buttonVariants, IButtonLink } from './Button.types';

export const Button: React.FC<IButton> = ({ size = buttonSizes.NORMAL, variant = buttonVariants.PRIMARY, fullWidth = false, ...rest }) => {
  return <StyledButton size={size} variant={variant} fullWidth={fullWidth} {...rest} />;
};

export const ButtonLink: React.FC<IButtonLink> = ({ size = buttonSizes.NORMAL, variant = buttonVariants.PRIMARY, fullWidth = false, ...rest }) => {
  return <StyledButtonLink size={size} variant={variant} fullWidth={fullWidth} {...rest} />;
};

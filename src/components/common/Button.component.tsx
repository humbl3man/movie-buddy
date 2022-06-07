import React from 'react';
import { StyledButton, StyledButtonLink } from './Button.styles';
import { ButtonLinkProps, ButtonProps, buttonSizes, buttonVariants } from './Button.types';

export const Button: React.FC<ButtonProps> = ({ size = buttonSizes.NORMAL, variant = buttonVariants.PRIMARY, fullWidth = false, isLoading = false, children, ...rest }) => {
  return (
    <StyledButton disabled={isLoading} size={size} variant={variant} fullWidth={fullWidth} {...rest}>
      {children}
    </StyledButton>
  );
};

export const ButtonLink: React.FC<ButtonLinkProps> = ({ size = buttonSizes.NORMAL, variant = buttonVariants.PRIMARY, fullWidth = false, ...rest }) => {
  return <StyledButtonLink size={size} variant={variant} fullWidth={fullWidth} {...rest} />;
};

import React from 'react';
import { StyledButton, StyledButtonLink } from './Button.styles';
import { IButton, buttonSizes, buttonVariants, IButtonLink } from './Button.types';

function setProps(props: IButton | IButtonLink) {
  return {
    size: props.size || buttonSizes.NORMAL,
    variant: props.variant || buttonVariants.PRIMARY,
    fullWidth: Boolean(props.fullWidth)
  };
}

export const Button: React.FC<IButton> = (props) => {
  return <StyledButton {...setProps(props)} {...props} />;
};

export const ButtonLink: React.FC<IButtonLink> = (props) => {
  return <StyledButtonLink {...setProps(props)} {...props} />;
};

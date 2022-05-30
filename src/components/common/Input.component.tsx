import React, { createRef, HtmlHTMLAttributes, useRef } from 'react';
import { FieldError } from 'react-hook-form';
import { StyledInputWrapper } from './Input.styles';

interface InputWrapperProps {
  label: string;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  children: JSX.Element | JSX.Element[];
  error?: FieldError | undefined;
}

export const InputWrapper: React.FC<InputWrapperProps> = (props) => {
  return (
    <StyledInputWrapper hasIcon={Boolean(props.icon)} iconPosition={props.iconPosition}>
      {props.icon && <div className="inputIcon">{props.icon}</div>}
      {props.children}
      {props.error && <div className="validationError">{props.error.message}</div>}
    </StyledInputWrapper>
  );
};

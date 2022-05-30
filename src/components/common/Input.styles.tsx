import styled from 'styled-components';

type StyledInputWrapperProps = {
  hasIcon?: boolean;
  iconPosition?: string;
};

export const StyledInputWrapper = styled.div<StyledInputWrapperProps>`
  position: relative;
  label {
    position: absolute;
    color: var(--grey600);
    user-select: none;
    transition: transform 200ms ease;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
    ${(props) => {
      if (props.hasIcon && props.iconPosition === 'left') {
        return `
          left: 5.6rem;
        `;
      }
      return `
        left: 1.6rem;
      `;
    }}
  }

  input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    transform: translateY(-3.1rem);
  }

  input {
    border: 2px solid var(--grey600);
    height: 64px;
    border-radius: 12px;
    background: var(--black10);
    font-size: inherit;
    color: var(--grey500);
    min-width: 344px;
    display: block;
    width: 100%;

    &:focus {
      border-color: var(--primary500);
      outline: 2px solid var(--primary500);
      outline-offset: 1px;
    }

    ${(props) => {
      if (props.hasIcon && props.iconPosition === 'left') {
        return `
          padding: 1.2rem 5.6rem 1.2rem 5.2rem;
        `;
      }

      return `
        padding: 1.2rem 1.6rem;
      `;
    }}
  }

  .inputIcon {
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    left: 1.6rem;
  }
  .validationError {
    color: var(--error500);
    font-size: 1.4rem;
    margin-top: 0.4rem;
  }
`;

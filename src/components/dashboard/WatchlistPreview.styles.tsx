import styled from 'styled-components';

export const StyledPreviewCard = styled.article`
  padding: 3rem;
  min-width: 300px;
  max-width: max-content;
  background: var(--grey800);
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--grey600);
  text-align: center;
  &:hover {
    border-color: var(--grey200);
  }
  .h1 {
    margin: 1rem 0;
  }
`;

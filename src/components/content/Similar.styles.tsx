import styled from 'styled-components';
import { StyledCirleButton } from '../common/Button.styles';

export const SimilarLoadMoreContainer = styled.div`
  position: relative;
  border-top: 2px solid var(--primary100);
  margin-top: 4rem;
`;
export const SimilarLoadMoreButton = styled(StyledCirleButton)`
  margin-left: auto;
  margin-right: auto;
  transform: translateY(-50%);
  transition: opacity 200ms ease;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

import styled from 'styled-components';

export const SimilarLoadMoreContainer = styled.div`
  position: relative;
  border-top: 2px solid var(--primary100);
  margin-top: 4rem;
`;
export const SimilarLoadMoreButton = styled.button`
  appearance: none;
  border: 2px solid var(--primary100);
  color: var(--primary100);
  background: var(--grey900);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  transform: translateY(-50%);
  transition: opacity 200ms ease;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

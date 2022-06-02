import styled from 'styled-components';

export const StyledDashboardContainer = styled.section`
  margin-top: 8rem;
`;

export const StyledAuthWarning = styled.div`
  border: 2px solid var(--warning500);
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

export const StyledAuthError = styled.div`
  background: var(--error500);
  color: var(--white);
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

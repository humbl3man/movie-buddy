import styled from 'styled-components';
import { StyledCirleButton } from '../../components/common/Button.styles';

export const StyledBackdropImage = styled.header<{ src: string; isPlaceholder: boolean }>`
  display: none;
  @media screen and (min-width: 767px) {
    display: block;
    overflow: hidden;
    border-radius: 40px;
    margin-top: 4rem;
    background-image: url(${(props) => props.src});
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 480px;
    background-position: ${(props) => (props.isPlaceholder ? 'center' : 'top')};
    background-blend-mode: darken;
  }
  @media screen and (min-width: 1100px) {
    min-height: 680px;
  }
`;
export const StyledDetailContainer = styled.div`
  @media screen and (min-width: 767px) {
    padding-left: 2rem;
    padding-right: 2rem;
    position: relative;
    top: -6rem;
  }
  @media screen and (min-width: 1024px) {
    padding-left: 8rem;
    padding-right: 8rem;
  }
`;
export const StyledDetailHeader = styled.header`
  background: rgba(32, 40, 62, 0.806);
  border-radius: 24px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  .h3 {
    margin-bottom: 0;
  }
  p {
    display: inline-block;
  }
  @media screen and (min-width: 767px) {
    padding: 4rem;
    display: inline-block;
    min-width: 340px;
    margin-bottom: 8rem;
    margin-top: 0;
  }
  @media screen and (min-width: 1024px) {
    min-width: 540px;
  }
`;

export const StyledBreadCrumbs = styled.div`
  display: flex;
  & > * {
    margin-right: 1.6rem;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const StyledDetailBody = styled.section`
  display: grid;
  gap: 2rem;
  @media screen and (min-width: 767px) {
    gap: 3rem;
    grid-template-columns: 300px 1fr;
  }
  @media screen and (min-width: 1024px) {
    gap: 8rem;
    grid-template-columns: 500px 1fr;
  }
`;
export const StyledPosterImage = styled.div`
  border-radius: 24px;
  overflow: hidden;
  height: max-content;
  img {
    width: 100%;
  }
`;
export const StyledRating = styled.div`
  background-color: var(--black65);
  color: var(--warning500);
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  margin-top: 2.4rem;
  margin-bottom: 2.4rem;
  p {
    margin: 0 0 0 0.4rem;
    color: var(--warning500);
  }
`;
export const StyledMetaInfo = styled.div`
  margin-bottom: 2.4rem;
  .label {
    margin: 0 0 0.8rem;
  }
  .large {
    color: var(--grey100);
    margin: 0;
  }
`;

export const StyledColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.4rem;
`;

export const StyledSkeletonText = styled.span<{ full?: boolean }>`
  height: 16px;
  display: block;
  width: ${(props) => (props.full ? '100%' : '50%')};
  background-color: var(--grey800);
  border-radius: 8px;
`;

export const StyledDetailFooter = styled.section`
  padding-top: 3rem;
  margin-top: 6rem;
  border-top: 1px solid var(--grey700);
  .similar-items-title {
    span {
      color: var(--primary200);
    }
  }
`;

export const StyledBackToTopButton = styled(StyledCirleButton)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 10;
  border-color: var(--tertary300);
  color: var(--tertary300);
  padding: 0.5rem;
  line-height: 1;
  box-shadow: 1px 5px 22px rgba(0, 0, 0, 0.5);
`;

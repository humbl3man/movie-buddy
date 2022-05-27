import styled from 'styled-components';
import { Content } from '../typings';
import { buildImageUrl } from '../utils/buildImageUrl';
import StarIcon from './StarIcon';
import placeholderImg from '../assets/imagePlaceholder.svg';

type ContentCardProps = {
  content: Content;
};

const StyledCard = styled.article<{ hasImage: boolean }>`
  position: relative;
  z-index: 1;
  padding: 0.8rem;
  background: rgba(32, 40, 62, 0.8);
  border-radius: 12px;
  height: 100%;
  transition: background 300ms ease;
  ${(props) =>
    props.hasImage
      ? `
  
    &:hover img {
      transform: scale(1.1);
    }

  `
      : ''}
  &:hover {
    background: var(--grey700);
  }
`;

const StyledCardImageContainer = styled.div`
  overflow: hidden;
  border-radius: 8px;

  img {
    max-width: 400px;
    width: 100%;
    height: auto;
    display: block;
    transition: transform 1s ease;
  }
`;

const StyledCardBody = styled.section`
  p {
    color: var(--grey50);
    padding-left: 0.8rem;
    margin-top: 2.4rem;
  }
`;

const StyledRating = styled.div`
  background-color: var(--black65);
  color: var(--warning500);
  left: 16px;
  top: 18px;
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  p {
    margin: 0 0 0 0.4rem;
    color: var(--warning500);
  }
`;

const ContentCard: React.FC<ContentCardProps> = (props) => {
  return (
    <StyledCard hasImage={Boolean(props.content.poster_path)}>
      {props.content.vote_average > 0 && (
        <StyledRating>
          <StarIcon gold />
          <p className="large">{props.content.vote_average.toFixed(1)}</p>
        </StyledRating>
      )}
      <StyledCardImageContainer>
        {props.content.poster_path ? (
          <img src={buildImageUrl({ src: props.content.poster_path, posterSize: 'w500' })} width="500" height="750" alt={props.content.name || props.content.title} />
        ) : (
          <img src={placeholderImg} width="512" height="512" alt={props.content.name || props.content.title} />
        )}
      </StyledCardImageContainer>
      <StyledCardBody>
        <p>
          {props.content.title && <>{props.content.title}</>}
          {props.content.name && <>{props.content.name}</>}
        </p>
      </StyledCardBody>
    </StyledCard>
  );
};

export default ContentCard;

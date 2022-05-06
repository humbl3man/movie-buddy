import styled from 'styled-components';
import { Content } from '../typings';
import { buildImageUrl } from '../utils/buildImageUrl';
import StarIcon from './StarIcon';

type ContentCardProps = {
  content: Content;
};

const StyledCard = styled.article`
  position: relative;
  z-index: 1;
  padding: 0.8rem;
  background: rgba(32, 40, 62, 0.8);
  border-radius: 12px;

  .card-image-container {
    overflow: hidden;
    border-radius: 8px;
    img {
      max-width: 400px;
      width: 100%;
      height: auto;
      display: block;
    }
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
    <StyledCard>
      <StyledRating>
        <StarIcon gold />
        <p className="large">{props.content.vote_average.toFixed(1)}</p>
      </StyledRating>
      {props.content.poster_path && (
        <div className="card-image-container">
          <img src={buildImageUrl({ src: props.content.poster_path, posterSize: 'w500' })} alt={props.content.name || props.content.title} />
        </div>
      )}
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

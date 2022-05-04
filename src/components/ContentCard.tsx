import styled from 'styled-components';
import { BASE_URL } from '../api/config';
import { Content } from '../typings';
import StarIcon from './StarIcon';

const imageBaseURL = 'https://image.tmdb.org/t/p/';
const imageSize = 'w500';
const imageUrl = `${imageBaseURL}/${imageSize}`;

type ContentCardProps = {
  content: Content;
};

const StyledCard = styled.article`
  position: relative;
  z-index: 1;
  padding: 0.8rem;
  background: rgba(32, 40, 62, 0.8);
  p {
    color: var(--grey50);
    padding-left: 0.8rem;
  }
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
    margin: 0;
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
          <img src={`${imageUrl}/${props.content.poster_path}`} alt={props.content.name || props.content.title} />
        </div>
      )}
      <p>
        {props.content.title && <div>{props.content.title}</div>}
        {props.content.name && <div>{props.content.name}</div>}
      </p>
    </StyledCard>
  );
};

export default ContentCard;

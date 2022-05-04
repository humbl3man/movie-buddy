import styled from 'styled-components';
import { BASE_URL } from '../api/config';
import { Content } from '../typings';

const imageBaseURL = 'https://image.tmdb.org/t/p/';
const imageSize = 'w500';
const imageUrl = `${imageBaseURL}/${imageSize}`;

type ContentCardProps = {
  content: Content;
};

const StyledCard = styled.article`
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

const ContentCard: React.FC<ContentCardProps> = (props) => {
  return (
    <StyledCard>
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

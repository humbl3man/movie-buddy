import { Content } from '../../typings';
import { buildImageUrl } from '../../utils/content/buildImageUrl.utils';
import StarIcon from '../icons/StarIcon.component';
import placeholderImg from '../../assets/imagePlaceholder.svg';
import { StyledCard, StyledRating, StyledCardImageContainer, StyledCardBody } from './ContentCard.styles';

type ContentCardProps = {
  content: Content;
};

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

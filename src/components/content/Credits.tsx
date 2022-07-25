import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MovieCast } from '../../typings';
import { buildImageUrl } from '../../utils/content/buildImageUrl.utils';

import placeHolderImage from '../../assets/placeholder-images/placeholder185x277.svg';

const StyledCredits = styled.div`
  margin: 3rem 0;
  padding: 3rem 0 0;
  border-top: 1px solid var(--grey700);
`;
const StyledCastList = styled.div`
  display: flex;
  flew-wrap: nowrap;
  align-items: flex-start;
  overflow-y: auto;
`;
const StyledCastCard = styled(Link)`
  margin-right: 2rem;
  img {
    max-width: 185px;
  }
`;

type CreditProps = {
  data: MovieCast[];
};

const Credits: React.FC<CreditProps> = (props) => {
  const cast = props.data
    .filter((item) => Boolean(item.profile_path))
    .sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = placeHolderImage;
  };

  return (
    <StyledCredits>
      <h2 className="h4">Cast</h2>
      <StyledCastList>
        {cast.map((cast) => {
          return (
            <StyledCastCard to={`/person/${cast.id}`} key={cast.id}>
              <img src={buildImageUrl(cast.profile_path, { posterSize: 'w185' })} onError={handleImageError} width={185} height={277} alt={cast.name} />
              <p>
                <strong>{cast.name}</strong>
                <br />
                {cast.character}
              </p>
            </StyledCastCard>
          );
        })}
      </StyledCastList>
    </StyledCredits>
  );
};

export default Credits;

import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import getDetail from '../api/getDetail';
import StarIcon from '../components/StarIcon';
import { buildImageUrl } from '../utils/buildImageUrl';

const StyledBackdropImage = styled.header<{ src: string }>`
  overflow: hidden;
  border-radius: 40px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 480px;
  background-position: top;
  background-blend-mode: darken;
`;
const StyledDetailContainer = styled.div`
  padding-left: 8rem;
  padding-right: 8rem;
  position: relative;
  top: -6rem;
`;
const StyledDetailHeader = styled.header`
  background: rgba(32, 40, 62, 0.806);
  padding: 4rem;
  border-radius: 24px;
  display: inline-block;
  min-width: 340px;
  margin-bottom: 8rem;
  .h3 {
    margin-bottom: 0;
  }
  p {
    display: inline-block;
  }
  @media screen and (min-width: 1024px) {
    min-width: 540px;
  }
`;
const StyledDetailBody = styled.section`
  display: grid;
  grid-template-columns: 500px 1fr;
  gap: 8rem;
`;
const StyledPosterImage = styled.div`
  border-radius: 24px;
  overflow: hidden;
`;
const StyledRating = styled.div`
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
const StyledMetaInfo = styled.div`
  margin-bottom: 2.4rem;
  .label {
    margin: 0 0 0.8rem;
  }
  .large {
    color: var(--grey100);
    margin: 0;
  }
`;

const Detail: React.FC<{ type: 'movie' | 'tv' }> = (props) => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(['detail'], () => getDetail({ type: props.type, id }));
  const detail = data?.data;
  const genresList = detail?.genres?.map((g: any) => g.name).join(', ');

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <StyledBackdropImage src={buildImageUrl({ backdropSize: 'w1280', src: detail.backdrop_path })} />
      <StyledDetailContainer>
        <StyledDetailHeader>
          <Link to="/">
            <p className="xSmall">MoviePal</p>
          </Link>
          <h1 className="h3">{detail.title || detail.name}</h1>
        </StyledDetailHeader>
        <StyledDetailBody>
          <StyledPosterImage>
            <img src={buildImageUrl({ posterSize: 'w500', src: detail.poster_path })} alt={detail.title} />
          </StyledPosterImage>
          <div>
            <h4>{detail.tagline}</h4>
            <p>{detail.overview}</p>
            <StyledRating>
              <StarIcon gold />
              <p>{detail.vote_average.toFixed(1)}</p>
            </StyledRating>
            <StyledMetaInfo>
              <p className="label">Type</p>
              <p className="large">{props.type === 'movie' ? 'Movie' : 'TV'}</p>
            </StyledMetaInfo>
            <StyledMetaInfo>
              <p className="label">Release Date</p>
              <p className="large">{detail.release_date}</p>
            </StyledMetaInfo>
            <StyledMetaInfo>
              <p className="label">Run time</p>
              <p className="large">{detail.runtime} min</p>
            </StyledMetaInfo>
            {genresList && (
              <StyledMetaInfo>
                <p className="label">Genres</p>
                <p className="large">{genresList}</p>
              </StyledMetaInfo>
            )}
          </div>
        </StyledDetailBody>
      </StyledDetailContainer>
    </div>
  );
};

export default Detail;

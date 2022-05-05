import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import getDetail from '../api/getDetail';
import StarIcon from '../components/StarIcon';
import { buildImageUrl } from '../utils/buildImageUrl';
import placeholderImg from '../assets/imagePlaceholder.svg';

const StyledBackdropImage = styled.header<{ src: string }>`
  overflow: hidden;
  border-radius: 40px;
  margin-top: 4rem;
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
  gap: 8rem;
  @media screen and (min-width: 1024px) {
    grid-template-columns: 500px 1fr;
  }
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

const StyledColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.4rem;
`;

const StyledSkeletonText = styled.div<{ full?: boolean }>`
  height: 16px;
  width: ${(props) => (props.full ? '100%' : '50%')};
  background-color: var(--grey800);
  border-radius: 8px;
`;

const Detail: React.FC<{ type: 'movie' | 'tv' }> = (props) => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(['detail'], () => getDetail({ type: props.type, id }), {
    retry: false,
    refetchInterval: false
  });
  const detail = data?.data;
  const genresList = detail?.genres?.map((g: any) => g.name).join(', ');

  if (isLoading) {
    return (
      <div>
        <StyledBackdropImage
          src={placeholderImg}
          style={{
            backgroundPosition: 'center'
          }}
        />
        <div
          style={{
            marginTop: '15.2rem'
          }}>
          <StyledDetailBody>
            <StyledPosterImage>
              <img src={placeholderImg} alt="" />
            </StyledPosterImage>
            <div>
              <h4>
                <StyledSkeletonText full />
              </h4>
              <p>
                <StyledSkeletonText />
              </p>
              <p>
                <StyledSkeletonText />
              </p>
              <p>
                <StyledSkeletonText />
              </p>
              <p>
                <StyledSkeletonText />
              </p>
            </div>
          </StyledDetailBody>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1
          style={{
            color: 'var(--error500)'
          }}>
          Sorry, we encountered an error trying to get content. Please try again.
        </h1>
      </div>
    );
  }

  return (
    <div>
      {detail.backdrop_path ? (
        <StyledBackdropImage src={buildImageUrl({ backdropSize: 'w1280', src: detail.backdrop_path })} />
      ) : (
        <StyledBackdropImage
          src={placeholderImg}
          style={{
            backgroundPosition: 'center'
          }}
        />
      )}

      <StyledDetailContainer>
        <StyledDetailHeader>
          <Link to="/">
            <p className="xSmall">MoviePal</p>
          </Link>
          <h1 className="h3">{detail.title || detail.name}</h1>
        </StyledDetailHeader>
        <StyledDetailBody>
          <StyledPosterImage>
            {detail.poster_path ? <img src={buildImageUrl({ posterSize: 'w500', src: detail.poster_path })} alt="" /> : <img src={placeholderImg} alt="" />}
          </StyledPosterImage>

          <div>
            <h4>{detail.tagline}</h4>
            <p>{detail.overview}</p>
            <StyledRating>
              <StarIcon gold />
              <p>{detail.vote_average.toFixed(1)}</p>
            </StyledRating>
            {props.type === 'movie' && (
              <div>
                <StyledMetaInfo>
                  <p className="label">Type</p>
                  <p className="large">Movie</p>
                </StyledMetaInfo>
                <StyledMetaInfo>
                  <p className="label">Release Date</p>
                  <p className="large">{detail.release_date}</p>
                </StyledMetaInfo>
                <StyledMetaInfo>
                  <p className="label">Run time</p>
                  <p className="large">{detail.runtime} min</p>
                </StyledMetaInfo>
              </div>
            )}
            {props.type === 'tv' && (
              <div>
                <StyledColumns>
                  <StyledMetaInfo>
                    <p className="label">Type</p>
                    <p className="large">TV Show</p>
                  </StyledMetaInfo>
                  <StyledMetaInfo>
                    <p className="label">Status</p>
                    <p className="large">{detail.status}</p>
                  </StyledMetaInfo>
                  <StyledMetaInfo>
                    <p className="label">First air date</p>
                    <p className="large">{detail.first_air_date}</p>
                  </StyledMetaInfo>
                  <StyledMetaInfo>
                    <p className="label">Last air date</p>
                    <p className="large">{detail.last_air_date}</p>
                  </StyledMetaInfo>
                  <StyledMetaInfo>
                    <p className="label">No. of seasons</p>
                    <p className="large">{detail.number_of_seasons}</p>
                  </StyledMetaInfo>
                  <StyledMetaInfo>
                    <p className="label">No. of episodes</p>
                    <p className="large">{detail.number_of_episodes}</p>
                  </StyledMetaInfo>
                </StyledColumns>
                {detail.episode_run_time && detail.episode_run_time[0] && (
                  <StyledMetaInfo>
                    <p className="label">Episode run time</p>
                    <p className="large">{detail.episode_run_time[0]} min</p>
                  </StyledMetaInfo>
                )}
              </div>
            )}

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

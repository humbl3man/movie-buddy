import { useQuery } from 'react-query';
import { Link, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import getDetail from '../api/getDetail';
import StarIcon from '../components/StarIcon';
import { buildImageUrl } from '../utils/buildImageUrl';
import placeholderImg from '../assets/imagePlaceholder.svg';
import { AxiosError } from 'axios';
import { Content } from '../typings';
import { useEffect } from 'react';

const StyledBackdropImage = styled.header<{ src: string }>`
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
    background-position: top;
    background-blend-mode: darken;
  }
  @media screen and (min-width: 1100px) {
    min-height: 680px;
  }
`;
const StyledDetailContainer = styled.div`
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
const StyledDetailHeader = styled.header`
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

const StyledBreadCrumbs = styled.div`
  display: flex;
  & > * {
    margin-right: 1.6rem;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const StyledDetailBody = styled.section`
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
const StyledPosterImage = styled.div`
  border-radius: 24px;
  overflow: hidden;
  height: max-content;
  img {
    width: 100%;
  }
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

const StyledSkeletonText = styled.span<{ full?: boolean }>`
  height: 16px;
  display: block;
  width: ${(props) => (props.full ? '100%' : '50%')};
  background-color: var(--grey800);
  border-radius: 8px;
`;

const Detail: React.FC<{ type: 'movie' | 'tv' }> = (props) => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery<Content, AxiosError>(['detail'], () => getDetail({ type: props.type, id }), {
    retry: false,
    refetchInterval: false
  });

  useEffect(() => {
    if (data?.title || data?.name) {
      document.title = `MoviePal | ${data.title || data.name}`;
    }
  }, [data]);

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
    // redirect to homepage if content was not found
    if (error?.response?.status === 404) {
      return <Navigate to={props.type === 'movie' ? '/movies' : 'tv'} />;
    }
    return (
      <div>
        <h1
          style={{
            color: 'var(--error500)'
          }}>
          Sorry, we encountered an error. Please try again.
        </h1>
      </div>
    );
  }

  return (
    <div>
      {data?.backdrop_path ? (
        <StyledBackdropImage src={buildImageUrl({ backdropSize: 'w1280', src: data.backdrop_path })} />
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
          <StyledBreadCrumbs>
            <Link to="/">
              <p className="xSmall">MoviePal</p>
            </Link>
            <p className="xSmall">/</p>
            <Link to={props.type === 'movie' ? '/movies' : '/tv'}>
              <p className="xSmall">{props.type === 'movie' ? 'Movies' : 'TV Shows'}</p>
            </Link>
          </StyledBreadCrumbs>

          <h1 className="h3">{data?.title || data?.name || ''}</h1>
        </StyledDetailHeader>
        <StyledDetailBody>
          <StyledPosterImage>
            {data?.poster_path ? <img src={buildImageUrl({ posterSize: 'w500', src: data.poster_path })} alt="" /> : <img src={placeholderImg} alt="" />}
          </StyledPosterImage>

          <div>
            {data?.tagline && <h4>{data?.tagline}</h4>}
            {data?.overview && <p>{data?.overview}</p>}
            {data?.vote_average && data.vote_average !== 0 && (
              <StyledRating>
                <StarIcon gold />
                <p>{data.vote_average.toFixed(1)}</p>
              </StyledRating>
            )}
            {props.type === 'movie' && (
              <div>
                <StyledMetaInfo>
                  <p className="label">Type</p>
                  <p className="large">Movie</p>
                </StyledMetaInfo>
                {data?.release_date && (
                  <StyledMetaInfo>
                    <p className="label">Release Date</p>
                    <p className="large">{data.release_date}</p>
                  </StyledMetaInfo>
                )}
                {data?.runtime && (
                  <StyledMetaInfo>
                    <p className="label">Run time</p>
                    <p className="large">{data.runtime} min</p>
                  </StyledMetaInfo>
                )}
              </div>
            )}
            {props.type === 'tv' && (
              <div>
                <StyledColumns>
                  <StyledMetaInfo>
                    <p className="label">Type</p>
                    <p className="large">TV Show</p>
                  </StyledMetaInfo>
                  {data?.status && (
                    <StyledMetaInfo>
                      <p className="label">Status</p>
                      <p className="large">{data.status}</p>
                    </StyledMetaInfo>
                  )}
                  {data?.first_air_date && (
                    <StyledMetaInfo>
                      <p className="label">First air date</p>
                      <p className="large">{data.first_air_date}</p>
                    </StyledMetaInfo>
                  )}
                  {data?.last_air_date && (
                    <StyledMetaInfo>
                      <p className="label">Last air date</p>
                      <p className="large">{data.last_air_date}</p>
                    </StyledMetaInfo>
                  )}
                  {data?.number_of_seasons && (
                    <StyledMetaInfo>
                      <p className="label">No. of seasons</p>
                      <p className="large">{data.number_of_seasons}</p>
                    </StyledMetaInfo>
                  )}
                  {data?.number_of_episodes && (
                    <StyledMetaInfo>
                      <p className="label">No. of episodes</p>
                      <p className="large">{data.number_of_episodes}</p>
                    </StyledMetaInfo>
                  )}
                </StyledColumns>
                {data?.episode_run_time && data?.episode_run_time[0] && (
                  <StyledMetaInfo>
                    <p className="label">Episode run time</p>
                    <p className="large">{data.episode_run_time[0]} min</p>
                  </StyledMetaInfo>
                )}
              </div>
            )}

            {data?.genres?.length && (
              <StyledMetaInfo>
                <p className="label">Genres</p>
                <p className="large">{data.genres.map((g) => g.name).join(', ')}</p>
              </StyledMetaInfo>
            )}
          </div>
        </StyledDetailBody>
      </StyledDetailContainer>
    </div>
  );
};

export default Detail;

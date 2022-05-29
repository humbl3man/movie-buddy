import { useQuery } from 'react-query';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import getDetail from '../api/getDetail';
import StarIcon from '../components/StarIcon';
import { buildImageUrl } from '../utils/buildImageUrl';
import placeholderImg from '../assets/imagePlaceholder.svg';
import { Content } from '../typings';
import {
  StyledBackdropImage,
  StyledDetailBody,
  StyledPosterImage,
  StyledSkeletonText,
  StyledDetailContainer,
  StyledDetailHeader,
  StyledBreadCrumbs,
  StyledRating,
  StyledMetaInfo,
  StyledColumns
} from '../styles/detail.styles';
import FirestoreHelper from '../data/FirestoreHelper';
import { useAuth } from '../auth/authProvider';

const Detail: React.FC<{ type: 'movie' | 'tv' }> = (props) => {
  const { id } = useParams();
  const auth = useAuth();
  const { data, isLoading, isError, error } = useQuery<Content, AxiosError>(['detail'], () => getDetail({ type: props.type, id }), {
    retry: false,
    refetchInterval: false
  });
  const [loading, setLoading] = useState(true);
  const [addedToList, setAddedToList] = useState(false);

  const handleRemoveAdd = () => {
    const item = data as Content;
    item.type = props.type;
    setLoading(true);
    if (!addedToList) {
      FirestoreHelper.addToWatchlist(auth.authUser?.uid!, item!).then(() => {
        setAddedToList(true);
        setLoading(false);
      });
    } else {
      FirestoreHelper.removeFromWatchlist(auth.authUser?.uid!, item!).then(() => {
        setAddedToList(false);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    if (!isLoading && data && auth.authUser) {
      FirestoreHelper.getWatchlists(auth.authUser.uid).then((result) => {
        setLoading(false);
        if (result?.list && result?.list.length !== 0) {
          const added = result.list.find((item: any) => {
            return item.id === data.id;
          });
          if (added) {
            setAddedToList(true);
          } else {
            setAddedToList(false);
          }
        }
      });
    }
  }, [data, isLoading, auth.authUser]);

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

            {auth.authUser && (
              <button disabled={loading} type="button" className="btn" onClick={handleRemoveAdd}>
                {addedToList ? 'Remove From List' : 'Add To List'}
              </button>
            )}
          </div>
        </StyledDetailBody>
      </StyledDetailContainer>
    </div>
  );
};

export default Detail;

import { useInfiniteQuery, useQuery } from 'react-query';
import { Link, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { BiChevronUp as UpArrowIcon } from 'react-icons/bi';

import getDetail from '../api/getDetail';
import StarIcon from '../components/icons/StarIcon.component';
import { buildImageUrl } from '../utils/content/buildImageUrl.utils';
import placeholderImg from '../assets/imagePlaceholder.svg';
import { Content } from '../typings';
import {
  StyledBackdropImage,
  StyledDetailBody,
  StyledPosterImage,
  StyledDetailContainer,
  StyledDetailHeader,
  StyledBreadCrumbs,
  StyledRating,
  StyledMetaInfo,
  StyledColumns,
  StyledDetailFooter,
  StyledBackToTopButton
} from '../styles/page/detail.styles';
import { useAuth } from '../state/auth/authProvider';
import { useWatchlistData } from '../state/watchlist/watchlistProvider';
import SimilarItems from '../components/content/Similar.component';
import Loader from '../components/loader/Loader.component';
import { Button } from '../components/common/Button.component';
import getSimilar from '../api/getSimilar';

const Detail: React.FC<{ type: 'movie' | 'tv' }> = (props) => {
  const { id: pathId } = useParams();
  const auth = useAuth();
  const [page, setPage] = useState(1);
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const detailBodyElementRef = useRef(null);
  // data query
  const { data, isLoading, isError, error } = useQuery<Content, AxiosError>(['detail', pathId], () => getDetail({ type: props.type, id: pathId }), {
    retry: false,
    refetchInterval: false,
    refetchOnMount: false
  });
  // similar content query
  const {
    data: similarContent,
    isLoading: similarLoading,
    isError: similarError,
    fetchNextPage: fetchNextSimilarContent
  } = useInfiniteQuery<Content[], AxiosError>(['similarContent', pathId], ({ pageParam }) => getSimilar({ id: data?.id!, type: props.type, page: pageParam }), {
    enabled: typeof data?.id !== 'undefined',
    keepPreviousData: true
  });

  const { watchlist, addToWatchlist, removeFromWatchlist, loadingWatchlist } = useWatchlistData();
  const [addedToList, setAddedToList] = useState(false);

  const handleRemoveAdd = () => {
    if (!addedToList) {
      addToWatchlist(auth.authUser?.uid, props.type, data);
    } else {
      removeFromWatchlist(auth.authUser?.uid, data);
    }
  };

  useEffect(() => {
    if (!loadingWatchlist && data?.id && auth.authUser) {
      const added = watchlist.find((item: any) => {
        return item.id === data.id;
      });

      if (added) {
        setAddedToList(true);
      } else {
        setAddedToList(false);
      }
    }
  }, [data, watchlist, loadingWatchlist, auth.authUser]);

  useEffect(() => {
    if (data?.title || data?.name) {
      document.title = `MoviePal | ${data.title || data.name}`;
    }
  }, [data]);

  // back to top button
  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (records) => {
        const [mutation] = records;
        if (mutation.isIntersecting) {
          setShowBackToTopButton(false);
        } else {
          setShowBackToTopButton(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0
      }
    );
    if (detailBodyElementRef.current) observer.current.observe(detailBodyElementRef.current);
    return () => observer.current!.disconnect();
  });

  if (isLoading) {
    return <Loader fullScreen={false} />;
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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
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
        <motion.div initial={{ y: 30, opacity: 0 }} transition={{ delay: 0.2 }} animate={{ y: 0, opacity: 1 }}>
          <StyledDetailBody ref={detailBodyElementRef}>
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
                <Button disabled={loadingWatchlist} type="button" onClick={handleRemoveAdd}>
                  {addedToList ? '- Remove From List' : '+ Add To List'}
                </Button>
              )}
            </div>
          </StyledDetailBody>
          <StyledDetailFooter>
            <h4 className="similar-items-title">More Like This:</h4>
            <SimilarItems
              loadMore={() => {
                setPage((prev) => prev + 1);
                fetchNextSimilarContent({ pageParam: page });
              }}
              type={props.type}
              content={similarContent}
              isLoading={similarLoading}
              isError={similarError}
              page={page}
            />
          </StyledDetailFooter>
        </motion.div>
        <AnimatePresence>
          {showBackToTopButton && (
            <motion.div key="back-to-top" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}>
              <StyledBackToTopButton width={50} height={50} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
                <UpArrowIcon />
              </StyledBackToTopButton>
            </motion.div>
          )}
        </AnimatePresence>
      </StyledDetailContainer>
    </motion.div>
  );
};

export default Detail;

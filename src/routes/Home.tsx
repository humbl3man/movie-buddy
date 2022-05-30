import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useQuery, useQueryClient } from 'react-query';
import getPopular from '../api/getPopular';
import { Content, Filter } from '../typings';
import FilterSelect from '../components/content/FilterSelect.component';
import ContentList from '../components/content/ContentList.component';
import Search from '../components/search/Search.component';
import useLocalStorage from '../hooks/useLocalStorage';
import { setContentType } from '../utils/content/setContentType.utils';

const StyledHero = styled.div`
  width: 100%;
  margin-top: 8rem;
  @media screen and (min-width: 767px) {
    max-width: 600px;
  }
  p {
    color: var(--grey300);
  }
  .search-wrapper {
    margin-bottom: 8rem;
  }
`;

const StyledFeaturedContainer = styled.div`
  margin-top: 2.4rem;
  margin-bottom: 15.6rem;
  .featured-title {
    color: var(--grey400);
    margin-bottom: 2.4rem;
  }
`;

const Home = () => {
  const [filter, setFilter] = useLocalStorage<Filter>('home_filter_active', 'movies');
  const queryClient = useQueryClient();
  const movies = useQuery(['movies'], () => getPopular({ type: 'movie' }), { enabled: filter === 'all' || filter === 'movies' });
  const tvshows = useQuery(['tv'], () => getPopular({ type: 'tv' }), { enabled: filter === 'all' || filter === 'tv' });
  const moviesLoaded = !movies.isLoading && !movies.isError;
  const tvShowsLoaded = !tvshows.isLoading && !tvshows.isError;
  const allLoaded = moviesLoaded && tvShowsLoaded;

  return (
    <div>
      <StyledHero>
        <h1>MoviePal</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo voluptatum assumenda repellendus est sunt delectus architecto voluptate fugit quae molestias.</p>
        <div className="search-wrapper">
          <Search />
        </div>
        <FilterSelect
          selectedFilter={filter}
          onFilterSelect={(filter) => {
            setFilter(filter);
            queryClient.invalidateQueries(['movies', 'tv']);
          }}
        />
      </StyledHero>
      <StyledFeaturedContainer>
        {filter === 'all' && allLoaded && Boolean(movies.data?.results) && Boolean(tvshows.data?.results) && (
          <div>
            <h3 className="featured-title">
              All <span className="caption">({movies.data?.results.length + tvshows.data?.results.length})</span>
            </h3>
            <ContentList data={[...setContentType(movies.data?.results, 'movie'), ...setContentType(tvshows.data?.results, 'tv')]} />
          </div>
        )}
        {filter === 'movies' && moviesLoaded && Boolean(movies.data?.results) && (
          <div>
            <h3 className="featured-title">
              Movies <span className="caption">({movies.data?.results.length ?? 0})</span>
            </h3>
            <ContentList data={setContentType(movies.data?.results, 'movie')} />
          </div>
        )}
        {filter === 'tv' && tvShowsLoaded && Boolean(tvshows.data?.results) && (
          <div>
            <h3 className="featured-title">
              TV Shows <span className="caption">({tvshows.data?.results.length ?? 0})</span>
            </h3>
            <ContentList data={setContentType(tvshows.data?.results, 'tv')} />
          </div>
        )}
      </StyledFeaturedContainer>
    </div>
  );
};

export default Home;

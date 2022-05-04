import React, { useState } from 'react';
import styled from 'styled-components';

import searchIcon from '../assets/search-icon.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputWrapper } from '../components/Input';
import { API_KEY_v3 } from '../api/config';
import { useQuery, useQueryClient } from 'react-query';
import getPopular from '../api/getPopular';
import { Filter } from '../typings';
import FilterSelect from '../components/FilterSelect';
import ContentList from '../components/ContentList';

const StyledHero = styled.div`
  width: 100%;
  @media screen and (min-width: 767px) {
    max-width: 600px;
  }
  p {
    color: var(--grey300);
  }
  form {
    margin-bottom: 8rem;
  }
`;

type SearchInput = {
  searchTerm: string;
};

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SearchInput>();

  const [filter, setFilter] = useState<Filter>('all');

  const onSubmit: SubmitHandler<SearchInput> = (data) => console.log(data);
  const queryClient = useQueryClient();
  const movies = useQuery(['movies'], () => getPopular({ type: 'movie' }), { enabled: filter === 'all' || filter === 'movies' });
  const tvshows = useQuery(['tv'], () => getPopular({ type: 'tv' }), { enabled: filter === 'all' || filter === 'tv' });
  const moviesLoaded = !movies.isLoading && !movies.isError && movies.data?.data.results;
  const tvShowsLoaded = !tvshows.isLoading && !tvshows.isError && tvshows.data?.data.results;
  const allLoaded = moviesLoaded && tvShowsLoaded;

  return (
    <div>
      <StyledHero>
        <h1>MoviePal</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo voluptatum assumenda repellendus est sunt delectus architecto voluptate fugit quae molestias.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper error={errors.searchTerm} label="Search Movies or TV Shows" iconPosition="left" icon={<img src={searchIcon} alt="" aria-hidden />}>
            <input placeholder=" " {...register('searchTerm', { required: 'Please enter movie or TV name' })} />
            <label htmlFor="searchTerm">Search Movies or TV Shows</label>
          </InputWrapper>
        </form>

        <FilterSelect
          selectedFilter={filter}
          onFilterSelect={(filter) => {
            setFilter(filter);
            queryClient.invalidateQueries(['movies', 'tv']);
          }}
        />
      </StyledHero>
      <div>
        {filter === 'all' && allLoaded && (
          <div>
            <h2>All ({movies.data?.data.results.length + tvshows.data?.data.results.length})</h2>
            <ContentList data={[...movies.data?.data.results, ...tvshows.data?.data.results]} />
          </div>
        )}
        {filter === 'movies' && moviesLoaded && (
          <div>
            <h2>Movies ({movies.data?.data.results.length ?? 0})</h2>
            <ContentList data={movies.data?.data.results} />
          </div>
        )}
        {filter === 'tv' && tvShowsLoaded && (
          <div>
            <h2>TV Shows ({tvshows.data?.data.results.length ?? 0})</h2>
            <ContentList data={tvshows.data?.data.results} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

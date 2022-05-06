import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import getPopular from '../api/getPopular';
import ContentList from '../components/ContentList';
import Search from '../components/Search';

const StyledContainer = styled.section`
  margin-top: 6.4rem;
`;
const StyledHeader = styled.header`
  margin-bottom: 2.4rem;
  p {
    color: var(--primary200);
    margin: 0;
  }
`;

const MoviesSort = () => {
  const [page, setPage] = useState(1);
  const movies = useQuery(['movies', page], () => getPopular({ type: 'movie', page }), { keepPreviousData: true });
  const { data, isLoading, isError, isFetching, isPreviousData } = movies;

  if (isLoading) {
    return (
      <p className="large" style={{ textAlign: 'center' }}>
        Loading...
      </p>
    );
  }
  if (isError) {
    return (
      <p className="large" style={{ textAlign: 'center', color: 'var(--danger500)' }}>
        Error getting content. Please try again.
      </p>
    );
  }

  return (
    <StyledContainer>
      <StyledHeader>
        <p className="xSmall">MoviePal</p>
        <h1>Movies</h1>
      </StyledHeader>
      <div
        style={{
          marginBottom: '4.8rem'
        }}>
        <Search />
      </div>
      <p>{movies.data?.data?.results.length || 0} items</p>
      <ContentList data={data?.data.results} />
      <button
        type="button"
        onClick={() => {
          debugger;
          if (!isPreviousData && data.hasMore) {
            setPage((prev) => prev + 1);
          }
        }}>
        Load More
      </button>
    </StyledContainer>
  );
};

export default MoviesSort;

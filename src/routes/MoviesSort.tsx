import React, { useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import styled from 'styled-components';
import getPopular from '../api/getPopular';
import ContentList from '../components/ContentList';
import Search from '../components/Search';
import { setContentType } from '../utils/setContentType';

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
const StyledLoadMoreButton = styled.button`
  width: 320px;
  margin: 2rem auto;
  display: block;
`;

const MoviesSort = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(['movies'], ({ pageParam }) =>
    getPopular({ type: 'movie', page: pageParam })
  );

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
      {Boolean(data?.pages) &&
        data?.pages.map((page, i) => {
          return (
            <React.Fragment key={i}>
              <ContentList data={setContentType(page.data.results, 'movie')} />
            </React.Fragment>
          );
        })}
      <StyledLoadMoreButton
        type="button"
        className="btn"
        disabled={page >= 1000}
        onClick={() => {
          setPage((prev) => prev + 1);
          fetchNextPage({ pageParam: page });
        }}>
        Load More
      </StyledLoadMoreButton>
    </StyledContainer>
  );
};

export default MoviesSort;

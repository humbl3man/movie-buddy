import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Link } from 'react-router-dom';
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

interface SortProps {
  category: 'movie' | 'tv';
}

const Sort: React.FC<SortProps> = (props) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery([props.category], ({ pageParam }) => getPopular({ type: props.category, page: pageParam }));
  const heading = props.category === 'movie' ? 'Movies' : 'TV Shows';
  useEffect(() => {
    document.title = `MoviePal | ${props.category === 'movie' ? 'Movies' : 'TV Shows'}`;
  }, [props.category]);

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
        <Link to="/">
          <p className="xSmall">MoviePal</p>
        </Link>
        <h1>{heading}</h1>
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
              <ContentList data={setContentType(page.results, props.category)} />
            </React.Fragment>
          );
        })}
      <button
        type="button"
        className="btn btn--wide"
        style={{
          maxWidth: '300px',
          margin: '2rem auto 4rem auto',
          display: 'block'
        }}
        disabled={page >= 1000 || isLoading}
        onClick={() => {
          setPage((prev) => prev + 1);
          fetchNextPage({ pageParam: page });
        }}>
        {isLoading ? 'Loading...' : `Load More ${props.category === 'movie' ? 'Movies' : 'TV Shows'}`}
      </button>
    </StyledContainer>
  );
};

export default Sort;

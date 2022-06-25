import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsArrowLeft as LeftArrow } from 'react-icons/bs';

import getPopular from '../api/getPopular';
import { Button } from '../components/common/Button.component';
import ContentList from '../components/content/ContentList.component';
import { setContentType } from '../utils/content/setContentType.utils';

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
    document.title = `MovieBuddy | ${props.category === 'movie' ? 'Movies' : 'TV Shows'}`;
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
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: 2,
            color: 'var(--primary300)'
          }}>
          <LeftArrow style={{ display: 'inline-block', marginRight: '0.5rem' }} /> <span>Go Home</span>
        </Link>
        <h1>{heading}</h1>
      </StyledHeader>
      {Boolean(data?.pages) &&
        data?.pages.map((page, i) => {
          return (
            <React.Fragment key={i}>
              <ContentList showWatchlistButton data={setContentType(page.results, props.category)} />
            </React.Fragment>
          );
        })}
      <Button
        type="button"
        fullWidth
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
      </Button>
    </StyledContainer>
  );
};

export default Sort;

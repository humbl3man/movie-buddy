import { InfiniteData } from 'react-query';
import { BiChevronDown as DownArrowIcon } from 'react-icons/bi';

import { Content } from '../../typings';

import Loader from '../loader/Loader.component';
import React from 'react';
import ContentList from './ContentList.component';
import { setContentType } from '../../utils/content/setContentType.utils';
import { SimilarLoadMoreButton, SimilarLoadMoreContainer } from './Similar.styles';

interface SimilarProps {
  content?: InfiniteData<Content[]>;
  type: 'movie' | 'tv';
  isLoading: boolean;
  isError: boolean;
  page: number;
  loadMore: () => void;
}
const SimilarItems: React.FC<SimilarProps> = ({ content, type, isLoading, isError, loadMore, page }) => {
  if (isError) {
    return <div>Error getting content</div>;
  }
  if (isLoading) {
    return <Loader fullScreen={false} />;
  }

  if (!content?.pages) {
    return <p>No content found.</p>;
  }

  return (
    <div>
      {content.pages.map((contentBlock: Content[], index) => {
        return (
          <div
            style={{
              marginBottom: '3.2rem'
            }}
            key={index}>
            <ContentList showWatchlistButton data={setContentType(contentBlock, type)} />
          </div>
        );
      })}
      {page < 5 && (
        <SimilarLoadMoreContainer>
          <SimilarLoadMoreButton onClick={loadMore} disabled={page >= 1000 || isLoading} aria-label="Load More" title="Load More">
            {isLoading ? '...' : <DownArrowIcon size={'40px'} />}
          </SimilarLoadMoreButton>
        </SimilarLoadMoreContainer>
      )}
    </div>
  );
};

export default SimilarItems;

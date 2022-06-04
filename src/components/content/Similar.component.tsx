import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Content } from '../../typings';

import { buildImageUrl } from '../../utils/content/buildImageUrl.utils';
import Loader from '../loader/Loader.component';
import { StyledSimilarWidgetImage, StyledSimilarWidgetSlider } from './Similar.styles';
import { Link } from 'react-router-dom';
import { InfiniteData } from 'react-query';

interface SimilarProps {
  content?: any;
  type: 'movie' | 'tv';
  isLoading: boolean;
  isError: boolean;
  activeSlideIndex: number;
  loadMore: () => void;
}
const SimilarItems: React.FC<SimilarProps> = ({ content, type, isLoading, isError, activeSlideIndex, loadMore }) => {
  if (isError) {
    return <div>Error getting content</div>;
  }
  if (isLoading) {
    return <Loader fullScreen={false} />;
  }

  return (
    <StyledSimilarWidgetSlider>
      <Slider>
        {Boolean(content) &&
          content.map((page: any, index: any) => {
            return (
              <>
                {page.map((item: Content) => {
                  return <p>{item.title || item.name}</p>;
                })}
              </>
            );
          })}
      </Slider>
    </StyledSimilarWidgetSlider>
  );
};

export default SimilarItems;

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Content } from '../../typings';

import { buildImageUrl } from '../../utils/content/buildImageUrl.utils';
import Loader from '../loader/Loader.component';
import { StyledSimilarWidgetImage, StyledSimilarWidgetSlider } from './Similar.styles';
import { Link } from 'react-router-dom';

interface SimilarProps {
  items?: Content[] | [] | null;
  type: 'movie' | 'tv';
  isLoading: boolean;
  isError: boolean;
}
const SimilarItems: React.FC<SimilarProps> = ({ items, type, isLoading, isError }) => {
  if (isError) {
    return <div>Error getting content</div>;
  }
  if (isLoading) {
    return <Loader fullScreen={false} />;
  }
  if (!items || items.length === 0) {
    return <div>No content</div>;
  }

  return (
    <div>
      {items!.length > 0 && (
        <StyledSimilarWidgetSlider>
          <Slider slidesPerRow={6} slidesToScroll={1} infinite={false}>
            {items.map((item) => {
              const mediaURL = `/${type === 'movie' ? 'movie' : 'tv'}/${item.id}`;
              return (
                <div key={item.id}>
                  <Link to={mediaURL} replace>
                    <StyledSimilarWidgetImage key={item.id}>
                      <img src={buildImageUrl({ src: item.poster_path, posterSize: 'w154' })} alt={item.title || item.name} />
                    </StyledSimilarWidgetImage>
                  </Link>
                </div>
              );
            })}
          </Slider>
        </StyledSimilarWidgetSlider>
      )}
    </div>
  );
};

export default SimilarItems;

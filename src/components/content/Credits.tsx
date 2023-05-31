import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { FaChevronLeft as PrevIcon, FaChevronRight as NextIcon } from 'react-icons/fa';

import 'swiper/css';
// import 'swiper/css/navigation';

import { MovieCast } from '../../typings';
import { buildImageUrl } from '../../utils/content/buildImageUrl.utils';

import placeHolderImage from '../../assets/placeholder-images/placeholder185x277.svg';

const StyledCredits = styled.div`
  margin: 3rem 0;
  padding: 3rem 0 0;
  border-top: 1px solid var(--grey700);
`;
const StyledCastList = styled.div`
  /* display: flex; */
  /* flew-wrap: nowrap; */
  /* align-items: flex-start; */
  /* overflow-y: auto; */
  position: relative;
  .swiper-button-next,
  .swiper-button-prev {
    position: absolute;
    top: -70px;
    appearance: none;
    background: none;
    border: 2px solid rgba(255, 255, 255, 0.5);
    color: rgba(255, 255, 255, 0.5);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    &:disabled {
      opacity: 0.2;
    }
    &:hover:not(:disabled) {
      border-color: rgba(255, 255, 255, 0.8);
      color: rgba(255, 255, 255, 0.8);
    }
    &:not(:disabled) {
      cursor: pointer;
    }
  }
  .swiper-button-next {
    right: 0;
  }
  .swiper-button-prev {
    left: calc(100% - 100px);
  }
`;
const StyledCastCard = styled(Link)`
  margin-right: 2rem;
  img {
    max-width: 185px;
  }
`;

type CreditProps = {
  data: MovieCast[];
  max?: number;
};

function creditsFilterFn(item: MovieCast) {
  return Boolean(item.profile_path) && Boolean(item.character) && Boolean(item.name);
}

const Credits: React.FC<CreditProps> = ({ data, max = 20 }) => {
  const cast = data
    .filter(creditsFilterFn)
    .sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    })
    .slice(0, max);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = placeHolderImage;
  };

  // TODO: responsive
  const sliderConfig: SwiperProps = {
    spaceBetween: 50,
    slidesPerView: 5,
    slidesPerGroup: 5,
    grabCursor: true,
    modules: [Navigation],
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };

  return (
    <StyledCredits>
      <h2 className="h4">Cast</h2>
      <StyledCastList>
        <button className="swiper-button-prev">
          <PrevIcon />
        </button>
        <button className="swiper-button-next">
          <NextIcon />
        </button>
        <Swiper {...sliderConfig}>
          {cast.map((cast) => {
            return (
              <SwiperSlide key={cast.id}>
                <StyledCastCard to={`/person/${cast.id}`}>
                  <img src={buildImageUrl(cast.profile_path, { posterSize: 'w185' })} onError={handleImageError} width={185} height={277} alt={cast.name} />
                  <p>
                    <strong>{cast.name}</strong>
                    <br />
                    {cast.character}
                  </p>
                </StyledCastCard>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </StyledCastList>
    </StyledCredits>
  );
};

export default Credits;

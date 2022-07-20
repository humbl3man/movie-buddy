import { useInfiniteQuery, useQuery } from 'react-query';
import { Link, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { BiChevronUp as UpArrowIcon } from 'react-icons/bi';
import { StyledPersonContent, StyledPersonDetailContainer, StyledPersonImage } from '../styles/page/personDetail.styles';
import { Person, PersonImage } from '../typings';
import getPersonDetail from '../api/getPersonDetail';
import Loader from '../components/loader/Loader.component';
import getPersonImage from '../api/getPersonImage';
import { buildImageUrl } from '../utils/content/buildImageUrl.utils';
import placeholderImage from '../assets/imagePlaceholder.svg';
import { Button } from '../components/common/Button.component';
import { buttonSizes } from '../components/common/Button.types';
import getPersonCombinedCredits from '../api/getPersonCombinedCredits';

enum Gender {
  Female = 1,
  Male = 2,
  Other = 3
}

function getGenderDescription(gender?: number) {
  switch (gender) {
    case Gender.Female:
      return 'Female';
    case Gender.Male:
      return 'Male';
    case Gender.Other:
    default:
      return 'Non-Binary';
  }
}

function renderBiography(text: string | undefined | null, showMore: boolean, onShowMoreClick?: () => void) {
  if (!text) return '';
  const textBlocks = text.split('\n\n');
  return (
    <>
      {textBlocks.map((textBlock, i) => {
        const isLast = i === textBlocks.length - 1;
        return (
          <p key={i}>
            {textBlock}
            {isLast && showMore && (
              <Button style={{ marginLeft: '0.5rem', display: 'inline-block' }} type="button" size={buttonSizes.XSMALL} onClick={onShowMoreClick}>
                Show More
              </Button>
            )}
          </p>
        );
      })}
    </>
  );
}

const PersonDetail = () => {
  const { id } = useParams();
  // get person detail query
  const { data, status, error, isError } = useQuery<Person, AxiosError>(['person', id], () => getPersonDetail({ id }), {
    retry: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
  // get person image query
  const {
    data: imageData,
    status: imageStatus,
    error: imageError,
    isError: isImageError
  } = useQuery<{ id: string | undefined; profiles: PersonImage[] }, AxiosError>(['person_image', id], () => getPersonImage(id), {
    enabled: !!id,
    retry: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
  // get person combined credits
  const {
    data: creditsData,
    status: creditsStatus,
    error: creditsError,
    isError: isCreditsError
  } = useQuery(['person_combined_credits', id], () => getPersonCombinedCredits(id), {
    enabled: !!id,
    retry: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
  const maxCharacterCount = 1000;
  const [showMore, setShowMore] = useState(false);
  const [personImage] = imageData?.profiles ?? [];

  useEffect(() => {
    if (!data?.biography) {
      return;
    }

    if (data?.biography?.length > maxCharacterCount) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  }, [data?.biography]);

  if (status === 'loading') {
    return <Loader fullScreen />;
  }
  if (status === 'error') {
    return (
      <div
        style={{
          marginTop: '8rem'
        }}>
        <h1
          className="h3"
          style={{
            color: 'var(--error500)'
          }}>
          {error?.response?.status === 404 ? `We are unable to find resource for "${id}"` : 'Sorry, we encountered an error. Please try again.'}
        </h1>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <StyledPersonDetailContainer>
        <StyledPersonImage>
          {(imageStatus === 'loading' || imageStatus === 'error') && <img src={placeholderImage} alt={data?.name ?? ''} />}
          <img src={buildImageUrl(personImage?.file_path, { posterSize: 'w500' })} alt={data?.name ?? ''} />
        </StyledPersonImage>
        <StyledPersonContent>
          {data?.name && <h1>{data.name}</h1>}
          {data?.birthday && (
            <p className="text-block">
              <strong>Date of Birth:</strong> {data.birthday}
            </p>
          )}
          {data?.place_of_birth && (
            <p className="text-block">
              <strong>Place of birth:</strong> {data.place_of_birth}
            </p>
          )}
          {data?.deathday && (
            <p className="text-block">
              <strong>Date of Death:</strong> {data.deathday}
            </p>
          )}
          {Boolean(data?.gender) && (
            <p className="text-block">
              <strong>Gender:</strong> {getGenderDescription(data?.gender)}
            </p>
          )}
          {data?.biography && (
            <div className="text-block">
              <p>
                <strong>Biography:</strong>
              </p>

              {showMore && data.biography.length > maxCharacterCount
                ? renderBiography(data.biography.slice(0, maxCharacterCount), showMore, () => setShowMore(false))
                : renderBiography(data.biography, false)}
            </div>
          )}
        </StyledPersonContent>
      </StyledPersonDetailContainer>
    </motion.div>
  );
};

export default PersonDetail;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Downshift from 'downshift';

import { InputWrapper } from '../common/Input.component';
import searchIcon from '../../assets/search-icon.svg';
import getMultiSearchResults from '../../api/getMultiSearchResults';
import { buildImageUrl } from '../../utils/content/buildImageUrl.utils';
import placeholderImg from '../../assets/imagePlaceholder.svg';
import XIcon from '../icons/XIcon.component';
import { StyledSearchWrapper, StyledXButton, StyledSearchResults, StyledSearchResult } from './Search.styles';

const SEARCH_TIMEOUT: number = 500;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (e.target.value) {
      window.setTimeout(() => {
        getMultiSearchResults({ query: e.target.value })
          .then((data) => {
            setSearchResults(data.data.results.filter((result: any) => result.media_type !== 'person'));
          })
          .catch((err) => {
            console.error(err);
          });
      }, SEARCH_TIMEOUT);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultChange = (result: any) => {
    const url = result.media_type === 'movie' ? `/movie/${result.id}` : `/tv/${result.id}`;
    navigate(url, { replace: false });
  };

  return (
    <StyledSearchWrapper>
      <Downshift onChange={handleResultChange} itemToString={(result: any) => (result ? result.title || result.name || '' : '')}>
        {({ getLabelProps, getInputProps, getItemProps, getMenuProps, highlightedIndex }) => {
          return (
            <div>
              <InputWrapper label="Search Movies or TV Shows" iconPosition="left" icon={<img src={searchIcon} alt="" aria-hidden />}>
                <input {...getInputProps()} placeholder=" " value={searchTerm} onChange={handleSearchInputChange} />
                <label {...getLabelProps()}>Search Movies or TV Shows</label>
                <StyledXButton
                  visible={Boolean(searchTerm)}
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSearchResults([]);
                  }}>
                  <XIcon />
                </StyledXButton>
              </InputWrapper>
              {searchResults.length > 0 ? (
                <StyledSearchResults {...getMenuProps()}>
                  {searchResults.map((result: any, index: number) => {
                    const url = result.media_type === 'movie' ? `/movie/${result.id}` : `/tv/${result.id}`;
                    return (
                      <StyledSearchResult
                        to={url}
                        {...getItemProps({
                          key: result.id,
                          index,
                          item: result,
                          style: {
                            backgroundColor: highlightedIndex === index ? 'var(--primary300)' : '',
                            color: highlightedIndex === index ? 'var(--primary800)' : ''
                          }
                        })}>
                        {result.poster_path ? (
                          <img src={buildImageUrl({ src: result.poster_path, posterSize: 'w92' })} width={192} height={138} alt={result.title || result.name} />
                        ) : (
                          <img src={placeholderImg} alt={result.title || result.name} width={512} height={512} />
                        )}{' '}
                        <div>
                          <p className="xSmall" style={{ margin: 0, color: 'var(--grey500)' }}>
                            {result.media_type}
                          </p>
                          {result.title || result.name}
                        </div>
                      </StyledSearchResult>
                    );
                  })}
                </StyledSearchResults>
              ) : null}
            </div>
          );
        }}
      </Downshift>
      {/* <InputWrapper label="Search Movies or TV Shows" iconPosition="left" icon={<img src={searchIcon} alt="" aria-hidden />}>
        <input placeholder=" " value={searchTerm} onChange={handleSearchInputChange} />
        <label htmlFor="searchTerm">Search Movies or TV Shows</label>
        <StyledXButton
          visible={Boolean(searchTerm)}
          type="button"
          onClick={() => {
            setSearchTerm('');
            setSearchResults([]);
          }}>
          <XIcon />
        </StyledXButton>
      </InputWrapper>

      {searchResults.length > 0 && (
        <StyledSearchResults>
          {searchResults.map((result: any) => {
            const url = result.media_type === 'movie' ? `/movie/${result.id}` : `/tv/${result.id}`;
            return (
              <StyledSearchResult to={url} key={result.id}>
                {result.poster_path ? (
                  <img src={buildImageUrl({ src: result.poster_path, posterSize: 'w92' })} width={192} height={138} alt={result.title || result.name} />
                ) : (
                  <img src={placeholderImg} alt={result.title || result.name} width={512} height={512} />
                )}{' '}
                <div>
                  <p className="xSmall" style={{ margin: 0, color: 'var(--grey500)' }}>
                    {result.media_type}
                  </p>
                  {result.title || result.name}
                </div>
              </StyledSearchResult>
            );
          })}
        </StyledSearchResults>
      )} */}
    </StyledSearchWrapper>
  );
};

export default Search;

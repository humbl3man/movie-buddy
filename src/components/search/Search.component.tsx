import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Downshift from 'downshift';

import searchIcon from '../../assets/search-icon.svg';
import getMultiSearchResults from '../../api/getMultiSearchResults';
import { buildImageUrl } from '../../utils/content/buildImageUrl.utils';
import placeholderImg from '../../assets/imagePlaceholder.svg';
import XIcon from '../icons/XIcon.component';
import { StyledSearchWrapper, StyledXButton, StyledSearchResults, StyledSearchResult, StyledSearch } from './Search.styles';

const SEARCH_TIMEOUT: number = 500;

const Search: React.FC<{ onSearchItemSelect?: () => void }> = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    window.setTimeout(() => {
      if (e.target.value) {
        getMultiSearchResults({ query: e.target.value })
          .then((response) => {
            const results: any[] = response.data.results.filter((result: any) => result.media_type !== 'person');
            setSearchResults(results.slice(0, 20));
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        setSearchResults([]);
      }
    }, SEARCH_TIMEOUT);
  };

  const handleResultChange = (result: any) => {
    const url = result.media_type === 'movie' ? `/movie/${result.id}` : `/tv/${result.id}`;
    navigate(url, { replace: false });
    setSearchTerm('');
    setSearchResults([]);
    if (typeof props.onSearchItemSelect === 'function') {
      props.onSearchItemSelect();
    }
  };

  const handleResultsClear = () => {
    setSearchTerm('');
    setSearchResults([]);
    searchInputRef.current?.focus();
  };

  const handleSearchBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setSearchResults([]);
  };

  return (
    <StyledSearchWrapper>
      <Downshift onChange={handleResultChange} itemToString={(result: any) => (result ? result.title || result.name || '' : '')}>
        {({ getLabelProps, getInputProps, getItemProps, getMenuProps, highlightedIndex }) => {
          return (
            <div>
              <StyledSearch>
                <label {...getLabelProps()} className="sr-only">
                  Search Movies or TV Shows
                </label>
                <input
                  {...getInputProps()}
                  className="search-input"
                  placeholder="Search Movies or TV Shows"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  onBlur={handleSearchBlur}
                  ref={searchInputRef}
                />
                <img className="search-icon" src={searchIcon} alt="" />
                <StyledXButton visible={Boolean(searchTerm)} type="button" onClick={handleResultsClear}>
                  <XIcon />
                </StyledXButton>
              </StyledSearch>
              {searchResults.length > 0 && (
                <StyledSearchResults {...getMenuProps()}>
                  {searchResults.map((result: any, index: number) => {
                    const url = result.media_type === 'movie' ? `/movie/${result.id}` : `/tv/${result.id}`;
                    const resultImage = result.poster_path ? buildImageUrl(result.poster_path, { posterSize: 'w92' }) : placeholderImg;
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
                          <img src={resultImage} width={192} height={138} alt={result.title || result.name} />
                        ) : (
                          <img src={resultImage} alt={result.title || result.name} width={512} height={512} />
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
              )}
            </div>
          );
        }}
      </Downshift>
    </StyledSearchWrapper>
  );
};

export default Search;

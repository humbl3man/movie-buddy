import React, { useEffect, useRef, useState } from 'react';
import { InputWrapper } from './Input';
import searchIcon from '../assets/search-icon.svg';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import getMultiSearchResults from '../api/getMultiSearchResults';
import { Link } from 'react-router-dom';

const StyledSearchWrapper = styled.div`
  position: relative;
`;

const StyledSearchResults = styled.div`
  background: var(--grey100);
  margin-top: 2rem;
  border-radius: 8px;
`;
const StyledSearchResult = styled(Link)`
  padding: 1.4rem;
  color: var(--grey900);
  display: block;
  &:hover,
  &:focus {
    color: var(--grey100);
    background: var(--grey400);
  }
`;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (e.target.value) {
      window.setTimeout(() => {
        getMultiSearchResults({ query: e.target.value })
          .then((data) => {
            setSearchResults(data.data.results);
          })
          .catch((err) => {
            console.error(err);
          });
      }, 1000);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <StyledSearchWrapper>
      <InputWrapper label="Search Movies or TV Shows" iconPosition="left" icon={<img src={searchIcon} alt="" aria-hidden />}>
        <input placeholder=" " value={searchTerm} onChange={handleSearchInputChange} />
        <label htmlFor="searchTerm">Search Movies or TV Shows</label>
      </InputWrapper>
      {searchResults.length > 0 && (
        <StyledSearchResults>
          {searchResults.map((result: any) => {
            const url = result.media_type === 'movie' ? `/movie/${result.id}` : `tv/${result.id}`;
            return (
              <StyledSearchResult to={url} key={result.id}>
                {result.title || result.name}
              </StyledSearchResult>
            );
          })}
        </StyledSearchResults>
      )}
    </StyledSearchWrapper>
  );
};

export default Search;

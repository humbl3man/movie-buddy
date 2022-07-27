import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PersonCastCredit } from '../../../typings';
import React from 'react';

function getReleaseOrAirDateYear(releaseDate: string) {
  return new Date(releaseDate).getFullYear();
}

const StyledCreditsContainer = styled.div`
  margin-top: 4rem;
  border-top: 1px solid var(--grey600);
  padding-top: 4rem;
`;
const StyledCreditsRows = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--grey600);
  @media screen and (min-width: 767px) {
    max-width: 80%;
  }
`;
const StyledCreditLine = styled.div`
  color: var(--grey100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  a {
    color: var(--secondary500);
  }
  &:nth-child(odd) {
    border-top: 1px solid var(--grey700);
    background: rgba(255, 255, 255, 0.05);
  }
  &:nth-child(even) {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Credits: React.FC<{ data: PersonCastCredit[] }> = ({ data }) => {
  const movieCredits = data.filter((credit) => credit.media_type === 'movie');
  const tvCredits = data.filter((credit) => credit.media_type === 'tv');
  return (
    <StyledCreditsContainer>
      <h2>Acting Credits</h2>
      {movieCredits.length > 0 && (
        <React.Fragment>
          <StyledCreditsRows>
            <h3>Movies</h3>

            {movieCredits
              // sort by release year
              .sort((a, b) => {
                const yearA = getReleaseOrAirDateYear(a.release_date);
                const yearB = getReleaseOrAirDateYear(b.release_date);

                if (yearA > yearB) return 1;
                if (yearA < yearB) return -1;
                return 0;
              })
              .filter((credit) => Boolean(credit.title) && Boolean(credit.release_date))
              .map((credit) => {
                const url = credit.media_type === 'movie' ? `/movie/${credit.id}` : `/tv/${credit.id}`;
                return (
                  <StyledCreditLine key={credit.credit_id}>
                    <p>
                      <Link to={`/movie/${credit.id}`}>{credit.title}</Link>
                      <br />
                      <span>{credit.character}</span>
                    </p>
                    {getReleaseOrAirDateYear(credit.release_date)}
                  </StyledCreditLine>
                );
              })}
          </StyledCreditsRows>
        </React.Fragment>
      )}
      {tvCredits.length > 0 && (
        <React.Fragment>
          <StyledCreditsRows>
            <h3>TV</h3>

            {tvCredits
              // sort by release year
              .sort((a, b) => {
                const yearA = getReleaseOrAirDateYear(a.first_air_date);
                const yearB = getReleaseOrAirDateYear(b.first_air_date);

                if (yearA > yearB) return 1;
                if (yearA < yearB) return -1;
                return 0;
              })
              .filter((credit) => Boolean(credit.name) && Boolean(credit.first_air_date))
              .map((credit) => {
                return (
                  <StyledCreditLine key={credit.credit_id}>
                    <p>
                      <Link to={`/tv/${credit.id}`}>{credit.name}</Link>
                      <br />
                      <span>{credit.character}</span>
                    </p>
                    {getReleaseOrAirDateYear(credit.first_air_date)}
                  </StyledCreditLine>
                );
              })}
          </StyledCreditsRows>
        </React.Fragment>
      )}
    </StyledCreditsContainer>
  );
};

export default Credits;

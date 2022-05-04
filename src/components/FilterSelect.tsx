import styled from 'styled-components';
import { Filter } from '../typings';

type FilterSelectProps = {
  selectedFilter: Filter;
  onFilterSelect: (filter: Filter) => void;
};

type StyledFilterButtonProps = {
  active: boolean;
};
const StyledFilterSelect = styled.ul`
  list-style: none;
  margin: 0;
  background: var(--black20);
  padding 0.8rem;
  display: flex;
  border-radius: 1.2rem;
  li {
    padding: 0;
    list-style: none;
  }
`;
const StyledFilterButton = styled.button<StyledFilterButtonProps>`
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: center;
  font-size: inherit;
  border: 0;
  min-width: 80px;
  cursor: pointer;
  ${(props) => {
    if (props.active) {
      return `
      border-radius: 8px;
        background-color: var(--primary400);
        color: var(--primary50);
      `;
    }
    return `
      color: var(--grey300);
      background: transparent;
    `;
  }}
`;

const FilterSelect: React.FC<FilterSelectProps> = (props) => {
  return (
    <StyledFilterSelect>
      <li>
        <StyledFilterButton type="button" active={props.selectedFilter === 'all'} onClick={props.onFilterSelect.bind(null, 'all')}>
          All
        </StyledFilterButton>
      </li>
      <li>
        <StyledFilterButton type="button" active={props.selectedFilter === 'movies'} onClick={props.onFilterSelect.bind(null, 'movies')}>
          Movies
        </StyledFilterButton>
      </li>
      <li>
        <StyledFilterButton type="button" active={props.selectedFilter === 'tv'} onClick={props.onFilterSelect.bind(null, 'tv')}>
          TV Shows
        </StyledFilterButton>
      </li>
    </StyledFilterSelect>
  );
};

export default FilterSelect;

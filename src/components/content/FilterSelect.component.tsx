import styled from 'styled-components';
import { Filter } from '../../typings';

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
      &:not(:last-of-type) {
      margin-right: 1rem;
    }
  }
`;
const StyledFilterButton = styled.button<StyledFilterButtonProps>`
  align-items: center;
  appearance: none;
  border-radius: 8px;
  border: 0;
  cursor: pointer;
  display: flex;
  font-size: inherit;
  height: 4rem;
  justify-content: center;
  min-width: 80px;
  border: 2px solid transparent;
  background: transparent;
  ${(props) => {
    if (props.active) {
      return `
        border-color: var(--warning400);
        color: var(--warning400);
      `;
    }
    return `
      color: var(--grey300);
      border-color: transparent;
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

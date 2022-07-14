import { useQuery, useQueryClient } from 'react-query';

import getPopular from '../api/getPopular';
import { Content, Filter } from '../typings';
import FilterSelect from '../components/content/FilterSelect.component';
import ContentList from '../components/content/ContentList.component';
import useLocalStorage from '../hooks/useLocalStorage';
import { setContentType } from '../utils/content/setContentType.utils';
import { StyledFeaturedContainer, StyledFeaturedResults, StyledHero } from '../styles/page/home.styles';
import Loader from '../components/loader/Loader.component';

const Home = () => {
  const [filter, setFilter] = useLocalStorage<Filter>('home_filter_active', 'movies');
  const queryClient = useQueryClient();
  const {
    data: movies,
    isLoading: moviesLoading,
    error: moviesError
  } = useQuery(['movies'], () => getPopular({ type: 'movie' }), { refetchOnMount: true, refetchOnWindowFocus: false });
  const { data: tv, isLoading: tvLoading, error: tvError } = useQuery(['tv'], () => getPopular({ type: 'tv' }), { refetchOnMount: true, refetchOnWindowFocus: false });

  const isLoading = moviesLoading || tvLoading;
  const results = !isLoading
    ? movies?.results?.length > 0 && tv?.results?.length > 0
      ? [...setContentType(movies.results, 'movie'), ...setContentType(tv.results, 'tv')]
      : []
    : [];
  const filteredResults = getFilteredResults(results, filter);

  function getFilteredResults(results: Content[], filter: Filter) {
    switch (filter) {
      case 'movies':
        return results.filter((result) => result.type === 'movie');
      case 'tv':
        return results.filter((result) => result.type === 'tv');
      case 'all':
      default:
        return results;
    }
  }

  function getFilterTitle(filter: Filter) {
    if (filter === 'movies') return 'Popular Movies';
    if (filter === 'tv') return 'Popular TV Shows';
    return 'All Popular';
  }

  return (
    <div>
      <StyledHero>
        <h1>MovieBuddy</h1>
        <p className="large">
          MovieBuddy is a website that helps you navigate thousands of Movies and TV shows. Additionally, you can create an account to add any movie or TV show to your watchlist!
        </p>
        <FilterSelect
          selectedFilter={filter}
          onFilterSelect={(filter) => {
            setFilter(filter);
            queryClient.invalidateQueries(['movies', 'tv']);
          }}
        />
      </StyledHero>
      <StyledFeaturedContainer>
        {isLoading ? (
          <Loader fullScreen={false} />
        ) : (
          <StyledFeaturedResults>
            <h3 className="featured-title">
              {getFilterTitle(filter)} <span className="caption">({filteredResults.length})</span>
            </h3>
            <ContentList showWatchlistButton data={filteredResults} />
          </StyledFeaturedResults>
        )}
      </StyledFeaturedContainer>
    </div>
  );
};

export default Home;

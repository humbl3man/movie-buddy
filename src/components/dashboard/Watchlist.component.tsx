import ContentList from '../content/ContentList.component';
import Loader from '../loader/Loader.component';
import { useWatchlistData } from '../../state/watchlist/watchlistProvider';
import { StyledWatchlistContainer } from './Watchlist.styles';

const Watchlist = () => {
  const { watchlist, loadingWatchlist } = useWatchlistData();

  return (
    <div>
      <StyledWatchlistContainer>
        <h3>
          {watchlist.length === 0 ? `No` : watchlist.length} Item{watchlist.length === 1 ? '' : 's'} in your list
        </h3>
        {loadingWatchlist ? <Loader fullScreen={false} /> : watchlist.length > 0 ? <ContentList data={watchlist} /> : <p>You don't have any items in your list.</p>}
      </StyledWatchlistContainer>
    </div>
  );
};

export default Watchlist;

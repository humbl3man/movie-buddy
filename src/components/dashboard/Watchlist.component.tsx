import ContentList from '../content/ContentList.component';
import Loader from '../loader/Loader.component';
import { useWatchlistData } from '../../state/watchlist/watchlistProvider';
import { StyledWatchlistContainer } from './Watchlist.styles';
import { useAuth } from '../../state/auth/authProvider';

const Watchlist = () => {
  const { authUser } = useAuth();
  const { watchlist, loadingWatchlist, removeWatchlist } = useWatchlistData();

  function handleDeleteWatchlist() {
    const removeConfirm = confirm('Are you sure you want to delete your watchlist?');
    if (removeConfirm) {
      removeWatchlist(authUser?.uid);
    }
  }

  return (
    <div>
      <StyledWatchlistContainer>
        <h3
          style={{
            display: 'flex',
            alignItems: 'center'
          }}>
          <span>
            {watchlist.length === 0 ? `No` : watchlist.length} Item{watchlist.length === 1 ? '' : 's'} in your list
          </span>
          {watchlist.length > 0 && (
            <button
              type="button"
              className="btn btn--danger btn--xsmall"
              style={{
                marginLeft: '1rem'
              }}
              disabled={loadingWatchlist}
              onClick={handleDeleteWatchlist}>
              Remove all items
            </button>
          )}
        </h3>
        {loadingWatchlist ? <Loader fullScreen={false} /> : watchlist.length > 0 ? <ContentList data={watchlist} /> : <p>You don't have any items in your list.</p>}
      </StyledWatchlistContainer>
    </div>
  );
};

export default Watchlist;

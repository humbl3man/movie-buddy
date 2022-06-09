import ContentList from '../content/ContentList.component';
import Loader from '../loader/Loader.component';
import { useWatchlistData } from '../../state/watchlist/watchlistProvider';
import { StyledWatchlistContainer } from './Watchlist.styles';
import { useAuth } from '../../state/auth/authProvider';
import { Button } from '../common/Button.component';
import { buttonVariants, buttonSizes } from '../common/Button.types';

const Watchlist = () => {
  const { authUser } = useAuth();
  const { watchlist, loadingWatchlist, removeWatchlist } = useWatchlistData();

  function handleDeleteWatchlist() {
    const removeConfirm = confirm('Are you sure you want to clear all items in your watchlist?');
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
          <span>{watchlist.length === 0 ? `Your watchlist is empty` : `${watchlist.length} item${watchlist.length === 1 ? '' : 's'} in your list`}</span>
          {watchlist.length > 0 && (
            <Button
              type="button"
              variant={buttonVariants.DANGER}
              size={buttonSizes.XSMALL}
              style={{
                marginLeft: '2rem'
              }}
              disabled={loadingWatchlist}
              onClick={handleDeleteWatchlist}>
              Clear All
            </Button>
          )}
        </h3>
        {loadingWatchlist ? (
          <Loader fullScreen={false} />
        ) : watchlist.length > 0 ? (
          <ContentList showWatchlistButton data={watchlist} />
        ) : (
          <p>You don't have any items in your list.</p>
        )}
      </StyledWatchlistContainer>
    </div>
  );
};

export default Watchlist;

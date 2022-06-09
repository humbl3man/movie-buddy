import { ButtonLink } from '../common/Button.component';
import { StyledPreviewCard } from './WatchlistPreview.styles';

const WatchlistPreview: React.FC<{ watchlistCount: number }> = ({ watchlistCount }) => {
  return (
    <StyledPreviewCard>
      <div className="h1">{watchlistCount}</div>
      <p>{watchlistCount === 1 ? 'item' : 'items'} in watchlist</p>
      {watchlistCount > 0 && (
        <ButtonLink fullWidth to="/account/dashboard/watchlist">
          See Watchlist
        </ButtonLink>
      )}
    </StyledPreviewCard>
  );
};

export default WatchlistPreview;

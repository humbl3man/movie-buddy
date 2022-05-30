import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../state/auth/authProvider';
import FirestoreHelper from '../../utils/firestore/firestore.utils';
import { Content } from '../../typings';
import ContentList from '../content/ContentList.component';
import Loader from '../loader/Loader.component';

const StyledWatchlistContainer = styled.section`
  margin-top: 4rem;
`;

const Watchlist = () => {
  const { authUser } = useAuth();
  const [watchlist, setWatchlist] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FirestoreHelper.getWatchlists(authUser?.uid!).then((data) => {
      setLoading(false);
      if (data?.list && data?.list.length !== 0) {
        setWatchlist(data.list);
      } else {
        setWatchlist([]);
      }
    });
  }, []);

  useEffect(() => {
    console.log(watchlist);
  }, [watchlist]);

  if (loading) {
    return <Loader fullScreen={false} />;
  }

  return (
    <div>
      <StyledWatchlistContainer>
        <h3>{watchlist.length === 0 ? 0 : watchlist.length} Items in your list</h3>
        {watchlist.length > 0 ? <ContentList data={watchlist} /> : <p>You don't have any items in your list.</p>}
      </StyledWatchlistContainer>
    </div>
  );
};

export default Watchlist;

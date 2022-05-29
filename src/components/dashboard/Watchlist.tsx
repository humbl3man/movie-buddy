import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../auth/authProvider';
import FirestoreHelper from '../../data/FirestoreHelper';
import { Content } from '../../typings';
import ContentCard from '../ContentCard';
import ContentList from '../ContentList';

const StyledStatCard = styled.article`
  padding: 4rem;
  background: var(--grey900);
  text-align: center;
  h3 {
    margin-bottom: 1rem;
  }
`;
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
    return <div>Loading watchlist...</div>;
  }

  return (
    <div>
      <StyledWatchlistContainer>
        <h3>{watchlist.length === 0 ? 0 : watchlist.length} Items in your list</h3>
        <ContentList data={watchlist} />
      </StyledWatchlistContainer>
    </div>
  );
};

export default Watchlist;

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../auth/authProvider';
import FirestoreHelper from '../../data/FirestoreHelper';

const StyledStatCard = styled.article`
  padding: 4rem;
  background: var(--grey900);
  text-align: center;
  h3 {
    margin-bottom: 1rem;
  }
`;

const Watchlist = () => {
  const { authUser } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    FirestoreHelper.getUserWatchlists(authUser?.uid!).then((data) => {
      setIsLoadingData(false);
      if (data?.list && data?.list.length !== 0) {
        setWatchlist(data.list);
      } else {
        setWatchlist([]);
      }
    });
  }, []);

  return (
    <div>
      {!isLoadingData && (
        <StyledStatCard>
          <h3>{watchlist.length}</h3>
          <p>items in watchlist</p>
        </StyledStatCard>
      )}
    </div>
  );
};

export default Watchlist;

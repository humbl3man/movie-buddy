import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../state/auth/authProvider';
import FirestoreHelper from '../../utils/firestore/firestore.utils';
import { Content } from '../../typings';
import ContentList from '../content/ContentList.component';
import Loader from '../loader/Loader.component';
import { useData } from '../../state/data/dataProvider';

const StyledWatchlistContainer = styled.section`
  margin-top: 4rem;
`;

const Watchlist = () => {
  const { watchlist, loadingWatchlist } = useData();

  // useEffect(() => {
  //   FirestoreHelper.getWatchlists(authUser?.uid!).then((data) => {
  //     setLoading(false);
  //     if (data?.list && data?.list.length !== 0) {
  //       setWatchlist(data.list);
  //     } else {
  //       setWatchlist([]);
  //     }
  //   });
  // }, []);

  if (loadingWatchlist) {
    return <Loader fullScreen={false} />;
  }

  return (
    <div>
      <StyledWatchlistContainer>
        <h3>
          {watchlist.length === 0 ? `No` : watchlist.length} Item{watchlist.length === 1 ? '' : 's'} in your list
        </h3>
        {watchlist.length > 0 ? <ContentList data={watchlist} /> : <p>You don't have any items in your list.</p>}
      </StyledWatchlistContainer>
    </div>
  );
};

export default Watchlist;

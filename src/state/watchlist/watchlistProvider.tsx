import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Content } from '../../typings';
import FirestoreHelper from '../../utils/firestore/firestore.utils';
import { useAuth } from '../auth/authProvider';

export const WatchlistContext = createContext<{
  watchlist: Content[] | [];
  loadingWatchlist: boolean;
  addToWatchlist: any;
  removeFromWatchlist: any;
  removeWatchlist: any;
}>({
  watchlist: [],
  loadingWatchlist: true,
  addToWatchlist: () => {},
  removeFromWatchlist: () => {},
  removeWatchlist: () => {}
});

export const useWatchlistData = () => {
  const ctx = useContext(WatchlistContext);
  return { ...ctx };
};
export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const { authUser } = useAuth();
  const location = useLocation();
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [loadingWatchlist, setLoadingWatchlist] = useState(true);

  async function addToWatchlist(userid: string, type: 'movie' | 'tv', data: Content, onSuccess?: () => {}, onError?: () => {}) {
    setLoadingWatchlist(true);
    const itemToAdd = data;
    itemToAdd.type = type;
    FirestoreHelper.addToWatchlist(authUser?.uid!, itemToAdd!).then(() => {
      FirestoreHelper.getWatchlists(userid).then((docData) => {
        if (docData?.list && docData?.list.length !== 0) {
          setWatchlist(docData.list);
        } else {
          setWatchlist([]);
        }
        setLoadingWatchlist(false);
        if (typeof onSuccess === 'function') {
          onSuccess();
        }
      });
    });
  }

  async function removeFromWatchlist(userid: string, data: Content, onSuccess?: () => {}, onError?: () => {}) {
    setLoadingWatchlist(true);
    FirestoreHelper.removeFromWatchlist(userid, data).then(() => {
      FirestoreHelper.getWatchlists(userid).then((docData) => {
        if (docData?.list && docData?.list.length !== 0) {
          setWatchlist(docData.list);
        } else {
          setWatchlist([]);
        }
        setLoadingWatchlist(false);
        if (typeof onSuccess === 'function') {
          onSuccess();
        }
      });
    });
  }

  async function removeWatchlist(userid: string) {
    setLoadingWatchlist(true);
    await FirestoreHelper.removeWatchlist(userid).then(() => {
      setLoadingWatchlist(false);
      setWatchlist([]);
    });
  }

  useEffect(() => {
    if (!authUser) {
      setWatchlist([]);
      setLoadingWatchlist(false);
    } else {
      FirestoreHelper.getWatchlists(authUser.uid)
        .then((data) => {
          setLoadingWatchlist(false);
          if (data?.list) {
            setWatchlist(data.list);
          }
        })
        .catch((error: any) => {
          setLoadingWatchlist(false);
          console.error('Error retreiving watchlist for user', authUser.uid, error);
        });
    }
  }, [authUser, location]);

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        loadingWatchlist,
        addToWatchlist,
        removeFromWatchlist,
        removeWatchlist
      }}>
      {props.children}
    </WatchlistContext.Provider>
  );
};

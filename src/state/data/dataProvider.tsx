import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Content } from '../../typings';
import FirestoreHelper from '../../utils/firestore/firestore.utils';
import { useAuth } from '../auth/authProvider';

export const DataContext = createContext<{
  watchlist: Content[] | [];
  loadingWatchlist: boolean;
  addToWatchlist: any;
  removeFromWatchlist: any;
}>({
  watchlist: [],
  loadingWatchlist: true,
  addToWatchlist: () => {},
  removeFromWatchlist: () => {}
});

export const useData = () => {
  const ctx = useContext(DataContext);
  return { ...ctx };
};
export const DataProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const { authUser } = useAuth();
  const location = useLocation();
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [loadingWatchlist, setLoadingWatchlist] = useState(true);

  async function addToWatchlist(userid: string, type: 'movie' | 'tv', data: Content) {
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
      });
    });
  }

  async function removeFromWatchlist(userid: string, data: Content) {
    setLoadingWatchlist(true);
    FirestoreHelper.removeFromWatchlist(userid, data).then(() => {
      FirestoreHelper.getWatchlists(userid).then((docData) => {
        if (docData?.list && docData?.list.length !== 0) {
          setWatchlist(docData.list);
        } else {
          setWatchlist([]);
        }
        setLoadingWatchlist(false);
      });
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
    <DataContext.Provider
      value={{
        watchlist,
        loadingWatchlist,
        addToWatchlist,
        removeFromWatchlist
      }}>
      {props.children}
    </DataContext.Provider>
  );
};

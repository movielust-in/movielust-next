/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import Helmet from 'next/head';
import styled from '@emotion/styled';

import { useDispatch, useSelector } from '../redux';

import { fetchWatchlist, removeFromWL } from '../helpers/user/watchlist';

import {
  setWatchlist,
  setWatchlistView,
  removeFromWatchlist,
} from '../redux/reducers/watchlist.reducer';

import LoginRedirect from '../components/UI/LoginRedirect';
import Loading from '../components/UI/Loading';

import ContetnCard from '../components/ContentItem';

function Watchlist() {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist);
  const view = useSelector((state) => state.watchlist.current);

  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  const remove = async (id: number) => {
    try {
      const res = await removeFromWL(id, view);
      if (res === true) {
        dispatch(removeFromWatchlist({ id, view }));
      }
    } catch {
      //
    }
  };

  useEffect(() => {
    if (isAuthenticated && !watchlist.set) {
      setIsLoading(true);
      fetchWatchlist()
        .then((result) => {
          dispatch(setWatchlist(result));
        })
        .finally(() => setIsLoading(false));
    }
  }, [isAuthenticated, dispatch, watchlist.set]);

  return (
    <>
      <Helmet>
        <title>Watchlist - Movielust</title>
        <meta
          name="description"
          content="Add you favourite movies and shows to watchlist."
        />
      </Helmet>
      {isAuthenticated ? (
        <Container>
          <SwitchBox>
            <Switch
              onClick={() => dispatch(setWatchlistView('movie'))}
              style={{
                fontWeight: view === 'movie' ? 800 : 600,
                // border: view === 'movie' ? '2px solid silver' : '1px solid silver',
                opacity: view === 'movie' ? 1 : 0.8,
              }}
            >
              Movies
            </Switch>
            <Switch
              onClick={() => dispatch(setWatchlistView('tv'))}
              style={{
                fontWeight: view === 'tv' ? 800 : 600,
                // border: view === 'tv' ? '2px solid silver' : '1px solid silver',
                opacity: view === 'tv' ? 1 : 0.8,
              }}
            >
              Series
            </Switch>
          </SwitchBox>

          {isLoading ? (
            <Loading />
          ) : (
            <List>
              {watchlist[view === 'movie' ? 'movies' : 'series'].length ? (
                watchlist[view === 'movie' ? 'movies' : 'series'].map(
                  (movie) => (
                    <ContetnCard
                      key={movie.id}
                      id={movie.id!}
                      title={(movie.title || movie.name)!}
                      overview={movie.overview!}
                      posterPath={movie.poster_path!}
                      remove={remove}
                      type={view}
                    />
                  )
                )
              ) : (
                <Lonely>It feels quite lonely here...</Lonely>
              )}
            </List>
          )}
        </Container>
      ) : (
        <LoginRedirect afterLoginRedirectTo="/watchlist" />
      )}
    </>
  );
}

export default Watchlist;

const Container = styled.div`
  margin-bottom: 75px;
  margin-top: 70px;
  overflow-x: hidden;
  @media (max-width: 724px) {
    margin-top: 40px;
  }
`;

const SwitchBox = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
  width: 97vw;
`;
const Switch = styled.button`
  background-color: #090c14;
  background-image: linear-gradient(0deg, #090c14 0%, #031d30 79%);
  border-bottom: 2px solid silver;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: flex;
  flex: 1;
  justify-content: center;
  letter-spacing: 0.9px;
  margin: 10px 0px;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;

  &:nth-of-type(1) {
    border-right: 2px solid silver;
    border-radius: 8px 0 0 8px;
  }
  &:nth-of-type(2) {
    border-left: 2px solid silver;
    border-radius: 0 8px 8px 0;
  }
`;

const List = styled.div`
  justify-content: center;
  list-style: none;
`;

const Lonely = styled.h1`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  text-align: center;
  @media (max-width: 724px) {
    font-size: 18px;
  }
`;

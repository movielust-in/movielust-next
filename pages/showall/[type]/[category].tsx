import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import Scroller from '../../../components/UI/Scroller';
import Loading from '../../../components/UI/Loading';

import {
  fetchallBollywood,
  fetchallTRM,
  fetchallSouth,
  fetchallGujarati,
} from '../../../helpers/tmdb/movies';

import {
  fetchAllAnimes,
  fetchAllPopularSeries,
} from '../../../helpers/tmdb/series';
import { AllResponse } from '../../../types/tmdb';

enum Categories {
  TopRated = 'TopRated',
  SouthIndian = 'SouthIndian',
  PopularSeries = 'PopularSeries',
  Bollywood = 'Bollywood',
  Gujarati = 'Gujarati',
  Anime = 'anime',
}

function Showall() {
  const router = useRouter();
  const type = router.query.type as string;
  const category = router.query.category as string;
  const [title, setTitle] = useState('');

  const [movies, setMovies] = useState<AllResponse>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    switch (category) {
      case Categories.Bollywood:
        setTitle('Bollywood Movies');
        fetchallBollywood().then((data: any) => {
          setMovies(data);
          setIsLoading(false);
        });
        document.title = `Bollywood - Movielust`;
        break;
      case Categories.TopRated:
        setTitle('Top Rated Movies');
        fetchallTRM().then((data: any) => {
          setMovies(data);
          setIsLoading(false);
        });
        break;
      case Categories.SouthIndian:
        setTitle('South Indian Movies');
        fetchallSouth().then((data: any) => {
          setMovies(data);
          setIsLoading(false);
        });
        document.title = `South Indian Movies - Movielust`;
        break;
      case Categories.PopularSeries:
        setTitle('Popular Shows');
        fetchAllPopularSeries().then((data: any) => {
          setMovies(data);
          setIsLoading(false);
        });
        document.title = `Popular Shows - Movielust`;
        break;
      case Categories.Gujarati:
        setTitle('Gujarati Movies');
        fetchallGujarati().then((data: any) => {
          setMovies(data);
          setIsLoading(false);
        });
        document.title = `Gujarati Movies - Movielust`;
        break;
      case Categories.Anime:
        setTitle('Anime');
        fetchAllAnimes().then((data: any) => {
          setMovies(data);
          setIsLoading(false);
        });
        document.title = `Anime - Movielust`;
        break;
      default:
      // document.location.href = "/";
    }
  }, [category, type]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <Title>{title}</Title>

          {movies && (
            <Scroller
              movies={movies.results}
              total={{
                results: movies.total_results,
                pages: movies.total_pages,
              }}
              type={type as string}
            />
          )}
        </Container>
      )}
    </div>
  );
}

export default Showall;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 70px;
  padding: 0 1px;
  text-align: center;
  @media (max-width: 724px) {
    padding: 0 10px;
    margin-top: 0;
  }
  @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
    margin-top: 10px;
  }
`;

const Title = styled.div`
  -webkit-text-fill-color: transparent;
  background: linear-gradient(to right, #c0c0c0 50%, #50595b 100%);
  background-clip: text;
  font-family: 'Bariol', sans-serif;
  font-size: 6rem;
  font-weight: bold;
  letter-spacing: 10px;
  margin-top: 10px;
  text-align: center;
  text-transform: uppercase;

  @media (max-width: 724px) {
    margin-top: 30px;
    letter-spacing: 4px;
    font-size: 20px;
  }
  @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
    font-size: 60px;
    letter-spacing: 5px;

    margin-bottom: 0.2em;
  }
`;

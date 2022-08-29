import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from '../../redux';

import { discover } from '../../helpers/tmdb/series';
import { setCurrentPage } from '../../redux/reducers/nav.reducer';
import {
  addSeries,
  setTotal,
  resetSeries,
  toggleSeriesGenreId,
} from '../../redux/reducers/series.reducer';
// import { GenreFilter, Scroller, Loading } from '../components';

import GenreFilter from '../../components/Filters/GenreFilter';
import Scroller from '../../components/UI/Scroller';

import { TV_GENRES as genres } from '../../config';
import Meta from '../../components/Meta';

function Series() {
  const type = 'tv';
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const total = useSelector((state) => state.series.total);
  const storeMovies = useSelector((state) => state.series.results);
  const filters = useSelector((state) => state.series.filters);

  const fetchSeries = () => {
    discover(filters.genres, type).then((movies) => {
      dispatch(addSeries(movies.results));
      dispatch(
        setTotal({ results: movies.total_results, pages: movies.total_pages })
      );
    });
  };

  const reset = () => dispatch(resetSeries());

  const addOrRemoveGenreIdFromFilter = (id: number) => {
    reset();
    dispatch(toggleSeriesGenreId(id));
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(setCurrentPage('series'));
    if (storeMovies.length === 0) {
      fetchSeries();
    }
    setIsLoading(false);
    // eslint-disable-next-line
  }, [filters]);

  return isLoading ? null : (
    <Container>
      <Meta
        title="Shows"
        description="Discover latest collection of Shows on Movielust."
        url="https://movielust.in/discover/shows"
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <GenreFilter type={type} />
      </div>
      <div>
        {filters.genres.map((id) => (
          <GenreBubble
            key={id}
            style={{
              border: '1px solid silver',
              padding: '5px',
              borderRadius: '10px',
              margin: '2px',
              fontWeight: '500',
              backgroundColor: '#0E2F44',
            }}
          >
            <span>{genres.find((genre) => id === genre.id)!.name}</span>
            <FaTimes onClick={() => addOrRemoveGenreIdFromFilter(id)} />
          </GenreBubble>
        ))}
      </div>
      <Scroller movies={storeMovies} total={total} type={type} />
    </Container>
  );
}
export default Series;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 70px;
  padding: 0 1px;
  overflow-x: hidden;
  text-align: center;
  @media (max-width: 724px) {
    padding: 0 10px;
    margin-top: 0;
  }
`;

const GenreBubble = styled.span`
  span {
    margin-right: 5px;
    vertical-align: center;
  }
  svg {
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
  }
`;

import Scroller from '../../../../components/UI/Scroller';
import {
  fetchallBollywood,
  fetchallTRM,
  fetchallSouth,
  fetchallGujarati,
} from '../../../../lib/tmdb/movie';
import { fetchAllAnimes, fetchAllPopularSeries } from '../../../../lib/tmdb/tv';
import styles from '../../../cast/[type]/[id]/[contentName]/allCast.module.scss';

enum Categories {
  TopRated = 'TopRated',
  SouthIndian = 'SouthIndian',
  PopularSeries = 'PopularSeries',
  Bollywood = 'Bollywood',
  Gujarati = 'Gujarati',
  Anime = 'anime',
}

const getData = async (category: string) => {
  let data;

  switch (category) {
    case Categories.Bollywood:
      data = await fetchallBollywood();
      return { data, title: 'Bollywood Movies' };

    case Categories.TopRated:
      data = await fetchallTRM();
      return { data, title: 'Top Rated Movies' };

    case Categories.SouthIndian:
      data = await fetchallSouth();
      return { data, title: 'South Indian Movies' };

    case Categories.PopularSeries:
      data = await fetchAllPopularSeries();
      return { data, title: 'Popular Shows' };

    case Categories.Gujarati:
      data = await fetchallGujarati();
      return { data, title: 'Gujarati Movies' };

    case Categories.Anime:
      data = await fetchAllAnimes();
      return { data, title: 'Animes' };

    default:
      return { data: null, title: null };
  }
};

async function Showall({
  params: { type, category },
}: {
  params: { type: string; category: string };
}) {
  const { data: movies, title } = await getData(category);

  return (
    <div>
      <div className={styles.Container}>
        <h1 className={styles.Title}>{title}</h1>

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
      </div>
    </div>
  );
}

export default Showall;

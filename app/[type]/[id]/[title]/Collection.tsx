import MovieCarousel from '../../../../components/Carousels/MovieCarousel';
import { fetchMovieCollection } from '../../../../lib/tmdb/movie';

import styles from './Detail.module.scss';

const getCollectionData = async (collectionId: string) => {
  const collectionData = await fetchMovieCollection(collectionId);
  return collectionData;
};

export default async function Collection({
  collectionId,
  type,
}: {
  collectionId: string;
  type: string;
}) {
  const collection = await getCollectionData(collectionId);

  return (
    <div className={styles.Collection}>
      <MovieCarousel
        type={type!}
        movies={collection.parts as any}
        title={collection.name}
        showCard={false}
      />
    </div>
  );
}

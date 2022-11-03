/* eslint-disable no-alert */
import React, { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { toast } from 'react-toastify';

import Script from 'next/script';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import BackgroundImage from '../../../components/Details/BackgroundImage';
import InformationComponent from '../../../components/Details/Information';
import DetailHelmet from '../../../components/Details/DetailHelmet';
import PosterAndIframe from '../../../components/Details/PosterAndIframe';
import MovieCarousel from '../../../components/Carousels/MovieCarousel';
import CastCarousel from '../../../components/Carousels/CastCarousel';
import ImageCrousel from '../../../components/Carousels/ImageCrousel';
import ProductionCompanies from '../../../components/Carousels/ProductionCompanies';
import SimilarMovies from '../../../components/Details/SimilarMovies';

// FOR SSR
import { FULL_MONTHS } from '../../../config';
import { VIDEO } from '../../../helpers/Urls';
import tmdbClient from '../../../helpers/tmdbClient';
import { fetchDetails } from '../../../helpers/tmdb';

// Magnets
import { fetchMagnetsfromYTSapi } from '../../../helpers/torrent';

// Redux Hooks
import { useDispatch, useSelector } from '../../../redux/store';

// Redux Actions
import {
  addMovieToWatchlist,
  addShowToWatchlist,
} from '../../../redux/reducers/watchlist.reducer';

// Types
import {
  CollectionInfoResponse,
  DetailResponse,
  Genre,
  MovieExternalIdsResponse,
  MovieImagesResponse,
  ShowResponse,
} from '../../../types/tmdb';

import { IMDBRating } from '../../../types/apiResponses';

import styles from '../../../components/Details/Detail.module.scss';
import MinutesToDuration from '../../../utils/minutesToDuration';

const Seasons = dynamic(() => import('../../../components/Shows/Seasons'));

interface DetailProps {
  contentData: DetailResponse;
}

const Detail: NextPage<DetailProps> = ({ contentData }: DetailProps) => {
  const router = useRouter();

  const id = router.query.id as string | undefined;
  const type = router.query.type as string | undefined;
  const title = router.query.name as string;

  const [magnets, setMagnets] = useState([]);

  const [externalIds, setExternalIds] = useState<MovieExternalIdsResponse>();

  const [collection, setCollection] = useState<CollectionInfoResponse>();

  const [imdbRating, setImdbRating] = useState<IMDBRating>();

  const [images, setImages] = useState<MovieImagesResponse['backdrops']>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (contentData.belongs_to_collection) {
      import('../../../helpers/tmdb/movies').then((r) =>
        r
          .fetchCollection(contentData.belongs_to_collection!.id)
          .then((res) => setCollection(res))
      );
    }

    if (contentData.imdb_id && type === 'movie') {
      import('../../../helpers/imdb').then((imdb) =>
        imdb
          .fetchIMDBRating(contentData.imdb_id!)
          .then((res) => setImdbRating(res))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentData]);

  useEffect(() => {
    if (type !== 'movie' || !contentData.imdb_id || !id) return;
    fetchMagnetsfromYTSapi(contentData.imdb_id, id).then((res) => {
      setMagnets(res as any);
    });
  }, [contentData.imdb_id, id, type]);

  useEffect(() => {
    if (!id || !type) return;

    import('../../../helpers/tmdb/movies').then((r) =>
      r.fetchExternalIds(id, type).then((res) => setExternalIds(res))
    );

    import('../../../helpers/tmdb/series').then((r) =>
      r
        .fetchTvImages(id, type)
        .then((imageRes) => setImages(imageRes.backdrops))
    );
  }, [id, type]);

  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  const toWatchlist = useCallback(async () => {
    if (!isAuthenticated) {
      alert('Login to access watchlist!');
      return;
    }
    try {
      const { addToWatchlist } = await import(
        '../../../helpers/user/watchlist'
      );

      await addToWatchlist(parseInt(id!, 10), type!);

      const data = {
        id,
        type,
        title: contentData?.title,
        overview: contentData?.overview,
        poster_path: contentData?.poster_path,
      };

      if (type === 'movie') dispatch(addMovieToWatchlist(data));
      else dispatch(addShowToWatchlist(data));

      toast('Added to Watchlist');
    } catch (err: any) {
      if (err && err.response && err.response.statusText) {
        alert('Already in Watchlist!');
        return;
      }
      alert('Something went wrong!');
    }
  }, [
    contentData?.overview,
    contentData?.poster_path,
    contentData?.title,
    dispatch,
    id,
    isAuthenticated,
    type,
  ]);

  const [loadingMovieIframe, setMovieIframeLoading] = useState(false);

  const iframeLoaded = () => {
    setMovieIframeLoading(false);
  };

  const [showMovie, setShowMovie] = useState(false);

  const toggleMovie = () => {
    setMovieIframeLoading(true);
    setShowMovie((state) => !state);
  };

  const commonData = {
    id: id as string,
    title: contentData.title || contentData.name || '',
    backdrop: contentData.backdrop_path,
    poster: contentData.poster_path,
    overview: contentData.overview,
    prodCompanies: contentData.production_companies,
    cast: contentData.credits.cast,
    tmdbRating: contentData.vote_average,
    voteCount: contentData.vote_count,
    genres: contentData.genres,
    genreString:
      contentData?.genres?.map((genre: Genre) => genre.name).join(', ') || '',
    original_language: contentData.original_language,
    imdbId: contentData.imdb_id,
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'movie' ? 'Movie' : 'TVSeries',
    url: `https://movielust.in/${type}/${id}/${title}`,
    name: commonData.title,
    image: contentData.poster_path
      ? `https://image.tmdb.org/t/p/w200${contentData.poster_path}`
      : undefined,
    dateCreated: contentData.release_date || undefined,
    duration:
      type === 'movie' && contentData.runtime
        ? MinutesToDuration(contentData.runtime)
        : undefined,
    actor:
      contentData?.credits?.cast
        ?.slice(0, 5)
        .map((person) => ({ '@type': 'Person', name: person.name })) ||
      undefined,
    description:
      contentData.overview?.split(' ').slice(0, 100).join(' ') || undefined,
    potentialAction: {
      '@type': 'WatchAction',
      target: `https://movielust.in/${type}/${id}/${title}`,
    },
    sameAs: contentData.imdb_id
      ? `www.imdb.com/title/${contentData.imdb_id}/`
      : undefined,
  };

  return (
    <div className={styles.Container}>
      <Script
        type="application/ld+json"
        id="movie_tv_structed_data"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DetailHelmet link={router.asPath} commonData={commonData} />

      <BackgroundImage backdrop={contentData.backdrop_path} />

      <PosterAndIframe
        id={id!}
        poster={contentData.poster_path}
        showMovie={showMovie}
        trailerKey={contentData.trailerKey}
        iframeLoaded={iframeLoaded}
      />

      <InformationComponent
        type={type!}
        commonData={commonData}
        releaseDate={contentData.release_date}
        releaseYear={contentData?.release_date?.split(' ')[-1] || ''}
        playMovie={toggleMovie}
        loadingMovieIframe={loadingMovieIframe}
        showMovie={showMovie}
        IMDBRating={imdbRating}
        magnets={magnets}
        runtime={contentData.runtime}
        externalIds={externalIds}
        released={contentData.released!}
        addToWatchlsit={toWatchlist}
        location={router}
      />

      {type === 'tv' &&
        contentData &&
        contentData.name &&
        contentData.number_of_seasons && (
          <Seasons
            id={id!}
            title={contentData.name}
            totalSeasons={contentData.number_of_seasons}
          />
        )}

      {/* Cast */}
      {contentData?.credits?.cast && contentData?.credits?.cast.length > 0 ? (
        <CastCarousel
          cast={contentData.credits.cast}
          title="Featured Cast"
          type={type}
          id={id}
          contentTitle={contentData.name}
        />
      ) : null}

      {collection &&
      collection.parts &&
      collection.parts?.length > 0 &&
      collection.parts.filter((movie: any) => movie.poster_path !== null)
        .length > 1 ? (
        <div
          // style={{
          //   backgroundColor: `rgba(${domColor[0]}, ${domColor[1]}, ${domColor[2]}, 0.3)`,
          // }}
          className={styles.Collection}
        >
          <MovieCarousel
            type={type!}
            movies={collection.parts as any}
            title={collection.name}
            showCard={false}
          />
        </div>
      ) : null}

      {/* IMAGES */}
      {images && images.length > 0 ? (
        <ImageCrousel images={images} type={type!} title="Images" />
      ) : null}

      {contentData?.production_companies &&
        contentData?.production_companies.length > 0 && (
          <ProductionCompanies
            data={contentData?.production_companies}
            title="Production"
            // dom={domColor}
          />
        )}

      {/* TODO: move similar movie fetching logic to supabase functions */}
      {contentData?.genres && contentData?.genres?.length > 0 ? (
        <SimilarMovies
          id={id!}
          type={type!}
          title={
            type === 'movie' ? 'Movies you may like' : 'Shows you may like'
          }
          genres={contentData?.genres}
          toBeFiltered={collection?.parts || []}
          // dom={domColor}
        />
      ) : null}
    </div>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  enum TYPE {
    movie = 'movie',
    tv = 'tv',
  }

  const { id, type } = query as { id: string; type: string };

  if (!(type === 'movie' || type === 'tv') || !parseInt(id, 10)) {
    return {
      notFound: true,
    };
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=604800, stale-while-revalidate=86400'
  );

  let { data } = await fetchDetails(id, type);

  data = {
    ...data,
    credits: {
      cast: data.credits.cast?.slice(0, 20),
    },
  };

  if (type === TYPE.movie) {
    if (data.release_date) {
      const relDate = new Date(data.release_date);
      data = {
        ...data,
        released: !(relDate > new Date()),
        release_date: `${
          FULL_MONTHS[relDate.getMonth()]
        }, ${relDate.getDate()} ${relDate.getFullYear()}`,
      };
    }

    if (data.runtime) {
      const time = parseInt(data.runtime, 10) / 60;
      data = {
        ...data,
        runtime: `${Math.floor(time)} hrs ${-Math.round(
          time - Math.floor(time) * 10
        )} mins`,
      };
    }
  } else if (type === TYPE.tv) {
    const showData = data as ShowResponse;

    const numOfSeasons = showData.number_of_seasons;

    // setting number of seasons
    if (!numOfSeasons) data = { ...data, runtime: undefined };
    else if (numOfSeasons > 1)
      data = { ...data, runtime: `${numOfSeasons} Seasons` };
    else data = { ...data, runtime: '1 Season' };

    const firstYear = showData.first_air_date!.slice(0, 4);
    const lastYear = showData.last_air_date?.slice(0, 4) || firstYear;

    if (firstYear === lastYear) data = { ...data, release_date: lastYear };
    else data = { ...data, release_date: `${firstYear}-${lastYear}` };
  }

  let vids = data.videos?.results || [];
  if (vids?.length <= 0) {
    const videoRes = await tmdbClient.get(
      VIDEO(id, type, data.original_language!)
    );
    vids = videoRes.data.results;
    if (vids.length > 0) {
      const officialVideos = vids.filter(
        (video) => video.official === true && video.type === 'Trailer'
      );
      data = {
        ...data,
        trailerKey:
          officialVideos.length > 0
            ? officialVideos[officialVideos.length - 1].key
            : vids[0].key,
      };
    }
  } else {
    const officialVideos = vids.filter(
      (video) => video.official === true && video.type === 'Trailer'
    );
    data = {
      ...data,
      trailerKey:
        officialVideos.length > 0
          ? officialVideos[officialVideos.length - 1].key
          : data.videos?.results![0].key,
    };
  }

  data = { ...data, videos: { results: [] }, production_countries: [] };

  return {
    props: {
      contentData: data,
    },
  };
};

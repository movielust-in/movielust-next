import Script from 'next/script';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import CastCarousel from '../../../../components/Carousels/CastCarousel';
import ProductionCompanies from '../../../../components/Carousels/ProductionCompanies';
import { image } from '../../../../lib/tmdb/Urls';
import { ShowResponse, Video } from '../../../../types/tmdb';
import MinutesToDuration from '../../../../utils/minutesToDuration';
import { getContentDetails, getVideosByLanguage } from '../../../../lib/tmdb';
import { FULL_MONTHS } from '../../../../constants';

import SimilarMovies from './SimilarMovies';
import BackgroundImage from './BackgroundImage';
import PosterIframeInfo from './Poster-Iframe-Information';
import Collection from './Collection';
import Images from './Images';
import styles from './Detail.module.scss';

const Seasons = dynamic(() => import('./Shows/Seasons'));

interface Params {
  id: string;
  type: string;
  title: string;
}

const Detail = async ({ params }: { params: Params }) => {
  const { id, type, title } = params;

  const contentData = await getData({ id, type });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'movie' ? 'Movie' : 'TVSeries',
    url: `https://movie-lust.vercel.app/${type}/${id}/${title}`,
    name: contentData.title || contentData.name,
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
        .map((person: any) => ({ '@type': 'Person', name: person.name })) ||
      undefined,
    description:
      contentData.overview?.split(' ').slice(0, 100).join(' ') || undefined,
    potentialAction: {
      '@type': 'WatchAction',
      target: `https://movie-lust.vercel.app/${type}/${id}/${title}`,
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
      {/*  !!! */}

      <BackgroundImage backdrop={contentData.backdrop_path} />

      <PosterIframeInfo
        type={type as 'movie' | 'tv'}
        contentData={contentData}
      />

      {type === 'tv' &&
      contentData &&
      contentData.name &&
      contentData.number_of_seasons ? (
        <Seasons
          id={id!}
          title={contentData.name}
          totalSeasons={contentData.number_of_seasons}
        />
      ) : null}

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

      {contentData?.belongs_to_collection ? (
        <Collection
          collectionId={contentData.belongs_to_collection.id}
          type={type}
        />
      ) : null}

      <Images id={id} type={type} />

      {contentData?.production_companies &&
        contentData?.production_companies.length > 0 && (
          <ProductionCompanies
            data={contentData?.production_companies}
            title="Production"
          />
        )}

      {contentData?.genres && contentData?.genres?.length > 0 ? (
        <SimilarMovies
          id={id!}
          type={type!}
          title={
            type === 'movie' ? 'Movies you may like' : 'Shows you may like'
          }
          lang={contentData.original_language}
          genres={contentData?.genres}
          toBeFiltered={[]}
        />
      ) : null}
    </div>
  );
};

export default Detail;

export async function generateMetadata({
  params,
}: {
  params: { id: string; type: string; title: string };
}): Promise<Metadata> {
  const { id, type, title: titleParam } = params;

  if (!(type === 'movie' || type === 'tv') || !parseInt(id, 10)) {
    notFound();
  }

  const data = await getContentDetails(id, type);

  const metadata: Metadata = {
    title: data.title || data.name,
    description: data.overview,
    openGraph: {
      title: data.title || data.name,
      description:
        data.overview || 'Discover and found about Movies and Shows.',
      siteName: 'Movielust',
      url: `https://movie-lust.vercel.app/${type}/${id}/${titleParam}`,
      type: 'website',
      images: data.backdrop_path
        ? [
            `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
            image(1280, data.backdrop_path),
            image(780, data.backdrop_path),
            image(300, data.backdrop_path),
          ]
        : [],
    },
    twitter: {
      title: data.title || data.name,
      card: 'summary_large_image',
      site: '@movielust_in',
      images: data.backdrop_path
        ? [
            `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
            image(1280, data.backdrop_path),
            image(780, data.backdrop_path),
            image(300, data.backdrop_path),
          ]
        : [],
      description: data?.overview?.slice(0, 200) || '',
    },
  };

  return metadata;
}

async function getData(query: { id: string; type: string }): Promise<any> {
  enum TYPE {
    movie = 'movie',
    tv = 'tv',
  }

  const { id, type } = query;

  if (!(type === 'movie' || type === 'tv') || !parseInt(id, 10)) {
    notFound();
  }

  const data = await getContentDetails(id, type);

  data.credits = {
    cast: data.credits?.cast?.slice(0, 20),
  };

  if (type === TYPE.movie) {
    if (data.release_date) {
      const relDate = new Date(data.release_date);
      data.released = !(relDate > new Date());
      data.release_date = `${
        FULL_MONTHS[relDate.getMonth()]
      }, ${relDate.getDate()} ${relDate.getFullYear()}`;
    }

    if (data.runtime) {
      const time = parseInt(data.runtime, 10) / 60;
      data.runtime = `${Math.floor(time)} hrs ${-Math.round(
        time - Math.floor(time) * 10
      )} mins`;
    }
  } else if (type === TYPE.tv) {
    const showData = data as ShowResponse;

    const numOfSeasons = showData.number_of_seasons;

    // setting number of seasons
    if (!numOfSeasons) data.runtime = undefined;
    else if (numOfSeasons > 1) data.runtime = `${numOfSeasons} Seasons`;
    else data.runtime = '1 Season';

    const firstYear = showData.first_air_date!.slice(0, 4);
    const lastYear = showData.last_air_date?.slice(0, 4) || firstYear;

    if (firstYear === lastYear) data.release_date = lastYear;
    else data.release_date = `${firstYear}-${lastYear}`;
  }

  let vids = data.videos?.results || [];
  if (vids?.length <= 0) {
    const videoRes = await getVideosByLanguage(
      id,
      type,
      data.original_language!
    );
    vids = videoRes.results;
    if (vids.length > 0) {
      const officialVideos = vids.filter(
        (video: Video) => video.official === true && video.type === 'Trailer'
      );
      data.trailerKey =
        officialVideos.length > 0
          ? officialVideos[officialVideos.length - 1].key
          : vids[0].key;
    }
  } else {
    const officialVideos = vids.filter(
      (video: Video) => video.official === true && video.type === 'Trailer'
    );
    data.trailerKey =
      officialVideos.length > 0
        ? officialVideos[officialVideos.length - 1].key
        : data.videos?.results![0].key;
  }

  data.videos = { results: [] };
  data.production_countries = [];

  return data;
}

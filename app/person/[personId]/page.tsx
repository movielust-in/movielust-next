import Image from 'next/image';
import Script from 'next/script';
import { cache } from 'react';
import { Metadata } from 'next';

import {
  fetchPersonDetails,
  fetchPersonMoviesCredits,
  fetchPopular,
  fetchPersonTvCredits,
} from '../../../lib/tmdb/person';
import Social from '../../../components/External/Social';
import { FULL_MONTHS } from '../../../constants';
import ImageCrousel from '../../../components/Carousels/ImageCrousel';
import MovieCarousel from '../../../components/Carousels/MovieCarousel';
import PeopleMovieCarousel from '../../../components/Carousels/PeopleMovieCarousel';
import CastCarousel from '../../../components/Carousels/CastCarousel';
import {
  PersonMovieCreditsResponse,
  PersonPopularResponse,
  PersonTvCreditsResponse,
} from '../../../types/tmdb';
import { image } from '../../../lib/tmdb/Urls';

import styles from './person.module.scss';
import Biography from './Biography';

async function PeopleDetail({ params }: { params: { personId: string } }) {
  const { personId } = params;

  const { personData, personMovies, personShows, popular } =
    await getPersonData(personId);

  if (!personData) return null;

  const structeredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personData.name,
    url: `https://movie-lust.vercel.app/person/${personData.id}`,
    image: personData.profile_path
      ? `https://image.tmdb.org/t/p/w200${personData.profile_path}`
      : undefined,
    description: personData.biography
      ? personData.biography.split(' ').slice(0, 100).join(' ')
      : undefined,
    birthDate: personData.birthday
      ? new Date(personData.birthday).toISOString()
      : undefined,
    deathDate: personData.deathday
      ? new Date(personData.deathday).toISOString()
      : undefined,
  };

  return (
    <div className={styles.Container}>
      <Script
        id="person_structered_data"
        strategy="afterInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structeredData) }}
      />
      <div className={styles.Background}>
        <Image
          alt="movieposter"
          crossOrigin="anonymous"
          src="/images/default_background.webp"
          fill
          sizes="100vw"
        />
      </div>
      <div className={styles.UpperContainer}>
        {/* Profile Poster */}
        <div className={styles.Profile}>
          <Image
            width={300}
            height={500}
            crossOrigin="anonymous"
            alt={personData.name || ''}
            src={`https://image.tmdb.org/t/p/w500/${personData.profile_path}`}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
        {/* Images for PC View */}
        {personData.images &&
        personData.images.profiles &&
        personData.images.profiles.length ? (
          <div className={styles.Images}>
            <ImageCrousel
              images={personData.images.profiles}
              type="cast"
              height={300}
            />
          </div>
        ) : null}
      </div>
      <div className={styles.LowerContainer}>
        <div className={styles.div}>
          <div className={styles.div}>
            <h2>{personData.name}</h2>
          </div>
          <div className={styles.Information}>
            {personData.birthday && (
              <h3>
                Born {personData.birthday}{' '}
                {personData.place_of_birth && `in ${personData.place_of_birth}`}
              </h3>
            )}
            <br />
            {personData.deathday && <h3>Died :{personData.deathday}</h3>}
          </div>
          <Social
            externalIds={personData.external_ids}
            type="name"
            name={personData.name}
          />
          <Biography bio={personData.biography} />
        </div>

        {personMovies &&
        (personMovies as PersonMovieCreditsResponse['cast'])?.length ? (
          <div className={styles.CastWorks}>
            <MovieCarousel
              movies={personMovies}
              type="movie"
              title="Movies"
              watchall={
                personData.name
                  ? `${personId}-${personData.name.replaceAll(' ', '-')}`
                  : personId
              }
            />
          </div>
        ) : null}

        {personShows &&
        (personShows as PersonTvCreditsResponse['cast'])?.length ? (
          <div className={styles.CastWorks}>
            <PeopleMovieCarousel
              movies={personShows}
              type="tv"
              title="TV Series"
            />
          </div>
        ) : null}

        {personData.images &&
        personData.images.profiles &&
        personData.images.profiles.length ? (
          <div className={styles.MobileImages}>
            <ImageCrousel
              images={personData.images.profiles}
              type="cast"
              title="Images"
              height={300}
            />
          </div>
        ) : null}

        {popular && (popular as PersonPopularResponse['results'])?.length ? (
          <CastCarousel cast={popular} title="Popular" />
        ) : null}
      </div>
    </div>
  );
}

export default PeopleDetail;

const cachedFetchPerson = cache(fetchPersonDetails);

export async function generateMetadata({
  params,
}: {
  params: { personId: string };
}) {
  const data = await cachedFetchPerson(params.personId);

  const metadata: Metadata = {
    title: data.name,
    description: data.biography?.slice(0, 200),
    openGraph: {
      title: data.name,
      description:
        data.biography?.slice(0, 200) ||
        'Discover and found about Movies and Shows.',
      siteName: 'Movielust',
      url: `https://movie-lust.vercel.app/person/${params.personId}`,
      type: 'website',
      images: data.profile_path
        ? [
            `https://image.tmdb.org/t/p/original${data.profile_path}`,
            image(500, data.profile_path),
            image(780, data.profile_path),
          ]
        : [],
    },
    twitter: {
      title: data.name,
      card: 'summary_large_image',
      site: '@movielust_in',
      images: data.profile_path
        ? [
            `https://image.tmdb.org/t/p/original${data.profile_path}`,
            image(500, data.profile_path),
            image(780, data.profile_path),
          ]
        : [],
      description: data.biography?.slice(0, 200),
    },
  };

  return metadata;
}

async function getPersonData(personId: string) {
  const all = await Promise.allSettled([
    cachedFetchPerson(personId),
    fetchPersonMoviesCredits(personId),
    fetchPersonTvCredits(personId),
    fetchPopular(),
  ]);

  let personData;

  if (all[0].status === 'fulfilled') personData = all[0].value;

  if (personData) {
    if (personData.birthday) {
      const bDate = new Date(personData.birthday);
      personData = {
        ...personData,
        birthday: `${
          FULL_MONTHS[bDate.getMonth()]
        }, ${bDate.getDate()} ${bDate.getFullYear()}`,
      };
    }

    if (personData.deathday) {
      const dDate = new Date(personData.deathday);
      personData = {
        ...personData,
        deathday: `${
          FULL_MONTHS[dDate.getMonth()]
        }, ${dDate.getDate()} ${dDate.getFullYear()}`,
      };
    }

    if (personData.place_of_birth) {
      personData = {
        ...personData,
        place_of_birth: personData.place_of_birth.split(',').join(', '),
      };
    }
  }

  const data = {
    personData,
    personMovies: null,
    personShows: null,
    popular: null,
  };

  if (all[1].status === 'fulfilled') data.personMovies = all[1].value as any;
  if (all[2].status === 'fulfilled')
    data.personShows = all[2].value.cast as any;
  if (all[3].status === 'fulfilled') data.popular = all[3].value.results as any;

  return data;
}

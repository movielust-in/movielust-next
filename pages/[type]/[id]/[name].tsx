import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import BackgroundImage from "../../../components/Details/BackgroundImage";
import InformationComponent from "../../../components/Details/Information";

import { fetchDetails, fetchSimilar } from "../../../helpers/tmdb";
import {
  fetchCollection,
  fetchExternalIds,
} from "../../../helpers/tmdb/movies";
import { fetchTvImages as fetchImages } from "../../../helpers/tmdb/series";
import { ShowResponse } from "../../../types/tmdb";
import tmdbClient from "../../../helpers/tmdbClient";
import { VIDEO } from "../../../helpers/Urls";
import PosterAndIframe from "../../../components/Details/PosterAndIframe";

import styles from "../../../components/Details/Detail.module.scss";
import { FULL_MONTHS } from "../../../config";
import MovieCarousel from "../../../components/Carousels/MovieCarousel";
import Seasons from "../../../components/Shows/Seasons";
import CastCarousel from "../../../components/Carousels/CastCarousel";
import ImageCrousel from "../../../components/Carousels/ImageCrousel";
import ProductionCompanies from "../../../components/Carousels/ProductionCompanies";
import SimilarMovies from "../../../components/Movies/SimilarMovies";
interface DetailProps {
  data: DetailProps;
}

const Detail = ({ data }: DetailProps) => {
  console.log(data);

  const [loadingMovieIframe, setMovieIframeLoading] = useState(false);

  const iframeLoaded = () => {
    setMovieIframeLoading(false);
  };

  const router = useRouter();

  const id = router.query.id as string;
  const type = router.query.type as string;

  if (!data) return <p>Loading....</p>;

  return (
    <div className={styles.Container}>
      <BackgroundImage backdrop={data.backdrop_path} />
      <PosterAndIframe
        id={id}
        poster={data.poster_path}
        showMovie={false}
        trailerKey={data.trailerKey}
        iframeLoaded={iframeLoaded}
      />

      <InformationComponent
        // domColor={domColor}
        type={type}
        commonData={{
          id,
          title: data.title,
          backdrop: data.backdrop_path,
          poster: data.poster_path,
          overview: data.overview,
          prodCompanies: data.production_companies,
          cast: data.credits.cast,
          tmdbRating: data.vote_average,
          voteCount: data.vote_count,
          genres: data.genres,
          genreString: data.genres.map((genre) => genre.name).join(", "),
          original_language: data.original_language,
          imdbId: data.imdb_id,
        }}
        releaseDate={data.release_date}
        releaseYear={data.release_date.split(" ")[-1]}
        playMovie={() => {}}
        loadingMovieIframe={loadingMovieIframe}
        showMovie={false}
        IMDBRating={{ rating: 8, votes: 1000 }}
        magnets={[]}
        runtime={data.runtime}
        externalIds={data.externalIds}
        released={data.released}
        addToWatchlsit={() => {}}
        playWebtor={() => {}}
        location={router}
      />

      {type === "tv" && data && data.title && (
        <Seasons
          id={id!}
          title={data.title}
          totalSeasons={data.number_of_seasons}
          setSeasonMagnets={() => {}}
        />
      )}

      {/* Cast */}
      {type === "movie" &&
        data?.credits?.cast &&
        data?.credits?.cast.length !== 0 && (
          <CastCarousel
            cast={data.credits.cast}
            title="Featured Cast"
            type="movie"
            // dom={domColor}
          />
        )}

      {data &&
      data.collection &&
      data.collection.parts &&
      data.collection.parts.filter((movie) => movie.poster_path !== null)
        .length > 1 ? (
        <div
          // style={{
          //   backgroundColor: `rgba(${domColor[0]}, ${domColor[1]}, ${domColor[2]}, 0.3)`,
          // }}
          className={styles.Collection}
        >
          <MovieCarousel
            type={type!}
            movies={data.collection.parts}
            title={data.collection.name}
            showCard={false}
          />
        </div>
      ) : null}

      {/* IMAGES */}
      {data.images && data.images.length >= 0 ? (
        <ImageCrousel images={data.images} type={type} title="Images" />
      ) : null}

      {data?.production_companies && data?.production_companies.length > 0 && (
        <ProductionCompanies
          data={data?.production_companies}
          title="Production"
          // dom={domColor}
        />
      )}

      {data?.genres?.length !== 0 && (
        <SimilarMovies
          id={id!}
          type={type!}
          title={
            type === "movie" ? "Movies you may like" : "Shows you may like"
          }
          genres={data?.genres}
          toBeFiltered={data.collection.parts}
          // dom={domColor}
        />
      )}
    </div>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  enum TYPE {
    movie = "movie",
    tv = "tv",
  }

  const { id, type } = query as { id: string; type: string };

  let { data } = await fetchDetails(id, type);

  data = {
    ...data,
    credits: {
      cast: data.credits.cast?.slice(0, 20),

      crew: data.credits.crew?.filter((member) => member.job === "Director"),
    },
  };

  if (type === TYPE.movie) {
    if (data.release_date) {
      const relDate = new Date(data.release_date);
      data = {
        ...data,
        released: relDate > new Date() ? false : true,
        release_date: `${
          FULL_MONTHS[relDate.getMonth()]
        }, ${relDate.getDate()} ${relDate.getFullYear()}`,
      };
    }

    if (data.runtime) {
      const time = parseInt(data.runtime) / 60;
      data = {
        ...data,
        runtime: `${Math.floor(time)} hrs ${-Math.round(
          time - Math.floor(time) * 10
        )} mins`,
      };
    }

    // collections
    if (data.belongs_to_collection) {
      const collectionRes = await fetchCollection(
        data.belongs_to_collection.id
      );

      if (collectionRes.name && collectionRes.parts)
        data = {
          ...data,
          collection: { name: collectionRes.name, parts: collectionRes.parts },
        };
    }
  } else if (type === TYPE.tv) {
    const showData = data as ShowResponse;

    const numOfSeasons = showData.number_of_seasons;

    // setting number of seasons
    if (!numOfSeasons) data = { ...data, runtime: undefined };
    else if (numOfSeasons > 1)
      data = { ...data, runtime: `${numOfSeasons} Seasons` };
    else data = { ...data, runtime: "1 Season" };
  }

  const externalIds = await fetchExternalIds(id, type);

  data = { ...data, externalIds };

  const images = await fetchImages(id, type);

  data = { ...data, images: images.backdrops?.slice(0, 20) };

  let vids = data.videos?.results || [];
  if (vids?.length <= 0) {
    const res = await tmdbClient.get(VIDEO(id, type, data.original_language!));
    vids = res.data.results;
    if (vids.length > 0) {
      const officialVideos = vids.filter(
        (video) => video.official === true && video.type === "Trailer"
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
      (video) => video.official === true && video.type === "Trailer"
    );
    data = {
      ...data,
      trailerKey:
        officialVideos.length > 0
          ? officialVideos[officialVideos.length - 1].key
          : data.videos?.results![0].key,
    };
  }

  delete data["videos"];
  delete data["production_countries"];

  return {
    props: {
      data,
    },
  };
};

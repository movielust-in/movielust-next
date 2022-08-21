import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

import BackgroundImage from "../../../components/Details/BackgroundImage";
import InformationComponent from "../../../components/Details/Information";

import { fetchDetails, fetchSimilar } from "../../../helpers/tmdb";
import {
  fetchCollection,
  fetchExternalIds,
} from "../../../helpers/tmdb/movies";
import { fetchTvImages as fetchImages } from "../../../helpers/tmdb/series";
import { DetailResponse, Genre, ShowResponse } from "../../../types/tmdb";
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
import DetailHelmet from "../../../components/Details/DetailHelmet";
import { fetchIMDBRating } from "../../../helpers/imdb";
interface DetailProps {
  contentData: DetailResponse;
}

const Detail: NextPage<DetailProps> = ({ contentData }) => {
  const [loadingMovieIframe, setMovieIframeLoading] = useState(false);

  const iframeLoaded = () => {
    setMovieIframeLoading(false);
  };

  const router = useRouter();

  const id = router.query.id as string;
  const type = router.query.type as string;

  return (
    <div className={styles.Container}>
      <DetailHelmet
        link={router.asPath}
        commonData={{
          id,
          title: contentData.title || contentData.name || "",
          backdrop: contentData.backdrop_path,
          poster: contentData.poster_path,
          overview: contentData.overview,
          prodCompanies: contentData.production_companies,
          cast: contentData.credits.cast,
          tmdbRating: contentData.vote_average,
          voteCount: contentData.vote_count,
          genres: contentData.genres,
          genreString:
            contentData?.genres?.map((genre: Genre) => genre.name).join(", ") ||
            "",
          original_language: contentData.original_language,
          imdbId: contentData.imdb_id,
        }}
      />

      <BackgroundImage backdrop={contentData.backdrop_path} />

      <PosterAndIframe
        id={id}
        poster={contentData.poster_path}
        showMovie={false}
        trailerKey={contentData.trailerKey}
        iframeLoaded={iframeLoaded}
      />

      <InformationComponent
        // domColor={domColor}
        type={type}
        commonData={{
          id,
          title: contentData.title || contentData.name || "",
          backdrop: contentData.backdrop_path,
          poster: contentData.poster_path,
          overview: contentData.overview,
          prodCompanies: contentData.production_companies,
          cast: contentData.credits.cast,
          tmdbRating: contentData.vote_average,
          voteCount: contentData.vote_count,
          genres: contentData.genres,
          genreString:
            contentData?.genres?.map((genre: Genre) => genre.name).join(", ") ||
            "",
          original_language: contentData.original_language,
          imdbId: contentData.imdb_id,
        }}
        releaseDate={contentData.release_date}
        releaseYear={contentData?.release_date?.split(" ")[-1] || ""}
        playMovie={() => {}}
        loadingMovieIframe={loadingMovieIframe}
        showMovie={false}
        IMDBRating={contentData.imdbRating}
        magnets={[]}
        runtime={contentData.runtime}
        externalIds={contentData.externalIds}
        released={contentData.released!}
        addToWatchlsit={() => {}}
        playWebtor={() => {}}
        location={router}
      />

      {type === "tv" &&
        contentData &&
        contentData.name &&
        contentData.number_of_seasons && (
          <Seasons
            id={id}
            title={contentData.name}
            totalSeasons={contentData.number_of_seasons}
            setSeasonMagnets={() => {}}
          />
        )}

      {/* Cast */}
      {type === "movie" &&
        contentData?.credits?.cast &&
        contentData?.credits?.cast.length !== 0 && (
          <CastCarousel
            cast={contentData.credits.cast}
            title="Featured Cast"
            type="movie"
            // dom={domColor}
          />
        )}

      {contentData &&
      contentData.collection &&
      contentData.collection.parts &&
      contentData.collection.parts.filter(
        (movie: any) => movie.poster_path !== null
      ).length > 1 ? (
        <div
          // style={{
          //   backgroundColor: `rgba(${domColor[0]}, ${domColor[1]}, ${domColor[2]}, 0.3)`,
          // }}
          className={styles.Collection}
        >
          <MovieCarousel
            type={type!}
            movies={contentData.collection.parts}
            title={contentData.collection.name}
            showCard={false}
          />
        </div>
      ) : null}

      {/* IMAGES */}
      {contentData.images && contentData.images.length >= 0 ? (
        <ImageCrousel images={contentData.images} type={type} title="Images" />
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
      {type === "movie" && contentData?.genres?.length !== 0 && (
        <SimilarMovies
          id={id!}
          type={type!}
          title={
            type === "movie" ? "Movies you may like" : "Shows you may like"
          }
          genres={contentData?.genres}
          toBeFiltered={contentData?.collection?.parts || []}
          // dom={domColor}
        />
      )}
    </div>
  );
};

export default Detail;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  enum TYPE {
    movie = "movie",
    tv = "tv",
  }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=604800, stale-while-revalidate=86400"
  );

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

    const firstYear = showData.first_air_date!.slice(0, 4);
    const lastYear = showData.last_air_date?.slice(0, 4) || firstYear;

    if (firstYear === lastYear) data = { ...data, release_date: lastYear };
    else data = { ...data, release_date: `${firstYear}-${lastYear}` };
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

  if (type === TYPE.movie && data.imdb_id) {
    try {
      const imdbRating = await fetchIMDBRating(data.imdb_id);

      data = { ...data, imdbRating };
    } catch (error) {}
  }

  delete data["videos"];
  delete data["production_countries"];

  return {
    props: {
      contentData: data,
    },
  };
};

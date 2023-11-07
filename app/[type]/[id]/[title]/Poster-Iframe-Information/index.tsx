'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  DetailResponse,
  MovieExternalIdsResponse,
} from '../../../../../types/tmdb';
import { fetchExternalIds } from '../../../../../helpers/tmdb/movies';
import { fetchMagnetsfromYTSapi } from '../../../../../helpers/torrent';
import { ImdbRating } from '../DetailTypes';

import InformationComponent from './Information';
import PosterAndIframe from './PosterAndIframe';

const PosterIframeInfo = ({
  contentData,
  type,
}: {
  contentData: DetailResponse;
  type: string;
}) => {
  const [showMovie, setShowMovie] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(false);
  const [imdbRating, setImdbRating] = useState<ImdbRating>();
  const [externalIds, setExternalIds] = useState<MovieExternalIdsResponse>();
  const [magnets, setMagnets] = useState();

  const onIframeLoaded = () => setIframeLoading(false);

  useEffect(() => {
    if (!imdbRating && contentData.imdb_id) {
      fetch(`/api/imdb-rating/?imdbId=${contentData.imdb_id}`)
        .then((res) => res.json())
        .then((rating) => {
          if (!rating?.length) return;
          setImdbRating(rating[0]);
        });
    }

    fetchExternalIds(contentData.id!, type).then((externalIdsRes) =>
      setExternalIds(externalIdsRes)
    );

    if (contentData.imdb_id)
      fetchMagnetsfromYTSapi(contentData.imdb_id, contentData.id!).then(
        (res) => {
          setMagnets(res as any);
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMovieToRecents = useCallback(async () => {
    try {
      const body = JSON.stringify({
        content_id: contentData.id,
        type,
      });
      await fetch('/api/user/recents', {
        method: 'PUT',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch {
      // do nothing
    }
  }, [contentData.id, type]);

  const onTogglePlayer = () => {
    setIframeLoading(true);
    setShowMovie((state) => !state);
    addMovieToRecents();
  };

  return (
    <>
      <PosterAndIframe
        id={contentData.id!.toString()}
        poster={contentData.poster_path}
        showMovie={showMovie}
        trailerKey={contentData.trailerKey}
        onIframeLoad={onIframeLoaded}
      />

      <InformationComponent
        type={type!}
        contentData={contentData}
        togglePlayer={onTogglePlayer}
        iframeLoading={iframeLoading}
        showMovie={showMovie}
        IMDBRating={imdbRating} // !!!
        magnets={magnets} // !!!
        externalIds={externalIds} // !!!
      />
    </>
  );
};

export default PosterIframeInfo;

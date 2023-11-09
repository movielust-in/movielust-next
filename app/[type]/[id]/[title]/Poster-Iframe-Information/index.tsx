'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  DetailResponse,
  MovieExternalIdsResponse,
} from '../../../../../types/tmdb';
import { fetchMovieMagnets } from '../../../../../lib/api/torrent';
import { ImdbRating } from '../../../../../types/api-responses';
import { fetchExternalIds } from '../../../../../lib/tmdb/external-ids';
import { MovieTorrent } from '../../../../../types/movie-torrents';
import { fetchIMDBRating } from '../../../../../lib/api/imdb';
import { addToRecents } from '../../../../../lib/api/user/recents';

import InformationComponent from './Information';
import PosterAndIframe from './PosterAndIframe';

const PosterIframeInfo = ({
  contentData,
  type,
}: {
  contentData: DetailResponse;
  type: 'movie' | 'tv';
}) => {
  const [showMovie, setShowMovie] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(false);
  const [imdbRating, setImdbRating] = useState<ImdbRating>();
  const [externalIds, setExternalIds] = useState<MovieExternalIdsResponse>();
  const [magnets, setMagnets] = useState<MovieTorrent[]>();

  const onIframeLoaded = () => setIframeLoading(false);

  useEffect(() => {
    if (!imdbRating && contentData.imdb_id) {
      fetchIMDBRating(contentData.imdb_id).then((rating) => {
        if (!rating?.data?.length) return;
        setImdbRating(rating.data[0]);
      });
    }

    fetchExternalIds(contentData.id!, type).then((externalIdsRes) =>
      setExternalIds(externalIdsRes)
    );

    if (contentData.imdb_id && type === 'movie')
      fetchMovieMagnets(contentData.imdb_id, contentData.id!).then((res) => {
        setMagnets(res?.data?.torrents);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMovieToRecents = useCallback(async () => {
    try {
      await addToRecents({
        content_id: contentData.id!,
        type: 'movie',
      });
    } catch {
      // do nothing
    }
  }, [contentData.id]);

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

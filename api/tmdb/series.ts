/* eslint-disable @typescript-eslint/naming-convention */
import tmdbClient from '../tmdbClient';

import {
    AllResponse,
    DiscoverMovieResponse,
    DiscoverTvResponse,
    TvExternalIdsResponse,
    TvImagesResponse,
    TvSeasonResponse,
} from '../../types/tmdb';
import { getAll } from '../Get';
import {
    GETALLTVCAST,
    POPULRAR_SERIES,
    seriesWithGenre,
    TVEXTERNAL_IDS,
    TVIMAGES,
    SEASON,
    LATEST_SHOWS,
    TR_ANIME,
    ALLPOPULRAR_SERIES,
    ANIME,
    DISCOVER,
} from '../Urls';
import fetchAllPages from './fetchAllPages';

export const fetchAllTvCast = (id: string | number, totalseason: number): Promise<AllResponse> =>
    new Promise((resolve) => {
        tmdbClient.get(GETALLTVCAST(id, 1)).then((response) => {
            let uniqueCast: any = [];
            let total_pages: number;
            const pageToFetch = totalseason;
            let casts = response.data.cast;

            total_pages = response.data.total_pages;
            const { total_results } = response.data;

            if (total_results === 0) {
                resolve({
                    total_results: 0,
                    total_pages: 0,
                    results: [],
                });
            } else if (total_pages === 1) {
                resolve({
                    total_results,
                    total_pages,
                    results: casts,
                });
            } else {
                total_pages = total_pages < pageToFetch ? total_pages : pageToFetch;
                getAll(
                    Array.from({ length: total_pages }, (_, i) => GETALLTVCAST(id, i + 1)),
                    tmdbClient
                )
                    .then((results) => {
                        casts = [];
                        uniqueCast = [];

                        results.forEach((result) => {
                            casts = [...casts, ...result.data.cast];
                            const key = 'id';
                            uniqueCast = [
                                ...new Map(
                                    casts.map((item: { [x: string]: any }) => [item[key], item])
                                ).values(),
                            ];
                        });
                        casts = casts.filter(
                            (value: { id: any }, index: any, self: any[]) =>
                                index === self.findIndex((t: { id: any }) => t.id === value.id)
                        );
                    })
                    .then(() => {
                        resolve({
                            total_results: casts.length,
                            total_pages,
                            results: uniqueCast,
                        });
                    });
            }
        });
    });

export const fetchPopularSeries = () =>
    new Promise((resolve) => {
        getAll(
            [
                POPULRAR_SERIES(1),
                POPULRAR_SERIES(2),
                POPULRAR_SERIES(3),
                POPULRAR_SERIES(4),
                POPULRAR_SERIES(5),
            ],
            tmdbClient
        ).then((response) => {
            const results = [
                ...response[0].data.results,
                ...response[1].data.results,
                ...response[2].data.results,
                ...response[3].data.results,
                ...response[4].data.results,
            ];
            resolve(results.sort((a, b) => b.vote_count - a.vote_count).slice(0, 20));
        });
    });

export const fetchSeriesofAllGenre = () =>
    new Promise((resolve) => {
        getAll(
            [
                seriesWithGenre(10759),
                seriesWithGenre(16),
                seriesWithGenre(35),
                seriesWithGenre(80),
                seriesWithGenre(99),
                seriesWithGenre(18),
                seriesWithGenre(10751),
                seriesWithGenre(10762),
                seriesWithGenre(9648),
                seriesWithGenre(10763),
                seriesWithGenre(10764),
                seriesWithGenre(10765),
                seriesWithGenre(10766),
                seriesWithGenre(10767),
                seriesWithGenre(10768),
                seriesWithGenre(37),
            ],
            tmdbClient
        ).then((response) => resolve(response));
    });

export const fetchTvExternalIds = (id: string | number): Promise<TvExternalIdsResponse> =>
    new Promise((resolve, reject) => {
        (async () => {
            try {
                const res = await tmdbClient.get(TVEXTERNAL_IDS(id));
                resolve(res.data);
            } catch (err) {
                reject();
            }
        })();
    });

export const fetchTvImages = (id: string | number, type: string): Promise<TvImagesResponse> =>
    (async () => {
        try {
            const res = await tmdbClient.get(TVIMAGES(id, type));
            return res.data;
        } catch (err) {
            return err;
        }
    })();

export const fetchSeason = (id: string, seasonNumber: number): Promise<TvSeasonResponse> =>
    new Promise((resolve, reject) => {
        (async () => {
            try {
                const res = await tmdbClient.get<TvSeasonResponse>(SEASON(id, seasonNumber));
                if (res.status !== 200) reject();
                resolve(res.data);
            } catch (err) {
                reject();
            }
        })();
    });

export const fetchLatestSeries = () =>
    new Promise((resolve, reject) => {
        (async () => {
            try {
                const res = await tmdbClient.get(LATEST_SHOWS);

                resolve(res.data.results);
            } catch {
                reject();
            }
        })();
    });

export const fetchTopRatedAnimes = () =>
    new Promise((resolve, reject) => {
        (async () => {
            try {
                const res = await tmdbClient.get(TR_ANIME);
                resolve(res.data.results);
            } catch {
                reject();
            }
        })();
    });

export const fetchAllPopularSeries = () =>
    fetchAllPages((page: number) => ALLPOPULRAR_SERIES(page));

export const fetchAllAnimes = () => fetchAllPages((page: number) => ANIME(page));

export const discover = (
    genre: number[],
    type: string
): Promise<DiscoverMovieResponse & DiscoverTvResponse> =>
    fetchAllPages((page: number) => DISCOVER(page, type, genre)) as any;

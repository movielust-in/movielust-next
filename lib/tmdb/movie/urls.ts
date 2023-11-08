/* eslint-disable no-underscore-dangle */

import { TYPE } from '../constants';

const newDate = new Date();
let date: number | string = newDate.getDate();
let month: number | string = newDate.getMonth() + 1;
const year = newDate.getFullYear();
if (date < 10) date = `0${date}`;
if (month < 10) month = `0${month}`;

export const Weekly_Trending_Movies = '/trending/movie/week' as const;

export const Weekly_Trending_All =
  '/trending/all/week?page=1&language=en-US`' as const;

export const Top_Rated_Movies = `/movie/top_rated` as const;

export const Upcoming_Movies = '/movie/upcoming?&language=en-US&page=1';

export const Bollywood_Movies = `/discover/movie?&region=IN&with_original_language=hi&primary_release_date.lte=${year}-${month}-${date}&sort_by=primary_release_date.desc`;

export const South_Movies = `/discover/movie?&with_original_language=te&sort_by=primary_release_date.desc&primary_release_date.lte=${year}-${month}-${date}`;

export const Gujarati_Movies = `/discover/movie?&with_original_language=gu&sort_by=primary_release_date.desc&primary_release_date.lte=${year}-${month}-${date}`;

export const movieWithGenre = (genreId: string | number) =>
  `/discover/movie?&with_genres=${genreId}`;

export const EXTERNAL_IDS = (id: number | number, type: TYPE) =>
  `/${type}/${id}/external_ids`;

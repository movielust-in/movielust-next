import {
  Person,
  PersonExternalIdsResponse,
  PersonImagesResponse,
  PersonMovieCreditsResponse,
  PersonPopularResponse,
  PersonTvCreditsResponse,
} from '../../../types/tmdb';
import {
  Person_Details,
  Person_Movie_Credits,
  Popular_Person,
  Person_Tv_Credits,
} from '../Urls';
import { tmdbFetch } from '../tmdb-fetch';

export const fetchPersonDetails = (id: string | number) =>
  tmdbFetch<
    Person & { images: PersonImagesResponse } & {
      external_ids: PersonExternalIdsResponse;
    }
  >(Person_Details(id), {
    language: 'en-US',
    append_to_response: ['images', 'external_ids'].join(','),
  });

export const fetchPersonMoviesCredits = (id: string | number) =>
  new Promise<PersonMovieCreditsResponse['cast']>((resolve, reject) => {
    tmdbFetch<PersonMovieCreditsResponse>(Person_Movie_Credits(id))
      .then((response) => {
        let result = response.cast;
        if (result) {
          result = result
            .filter(
              (movie) =>
                !!(
                  movie.character &&
                  movie.character !== 'Self' &&
                  movie.character !== 'Himself' &&
                  !movie.character.includes('(archive footage)') &&
                  !movie.character.includes('(uncredited)') &&
                  !movie.character.includes('(voice)')
                )
            )
            .sort((a: any, b: any) => b.popularity - a.popularity);
          resolve(result);
        } else resolve([]);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const fetchPopular = (): Promise<PersonPopularResponse> =>
  tmdbFetch<PersonPopularResponse>(Popular_Person);

export const fetchPersonTvCredits = (
  id: string | number
): Promise<PersonTvCreditsResponse> =>
  tmdbFetch<PersonTvCreditsResponse>(Person_Tv_Credits(id));

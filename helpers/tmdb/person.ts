import axios from "../tmdbClient";

import {
  Person,
  PersonExternalIdsResponse,
  PersonImagesResponse,
  PersonMovieCreditsResponse,
  PersonPopularResponse,
  PersonTvCreditsResponse,
} from "../../types/tmdb";

import {
  PERSON,
  PERSONMOVIES,
  POPULAR,
  PEOPLE_EXTERNALIDS,
  PERSON_IMAGES,
  CASTTV,
  TAGGED_IMG,
} from "../Urls";

export const fetchPerson = (id: string | number) =>
  axios.get<Person>(PERSON(id));

export const fetchPersonMovies = (id: string | number) =>
  new Promise((resolve, reject) => {
    axios
      .get<PersonMovieCreditsResponse>(PERSONMOVIES(id))
      .then((response) => {
        let result = response.data.cast;
        if (result) {
          result = result
            .filter(
              (movie) =>
                !!(
                  movie.character &&
                  movie.character !== "Self" &&
                  movie.character !== "Himself" &&
                  !movie.character.includes("(archive footage)") &&
                  !movie.character.includes("(uncredited)") &&
                  !movie.character.includes("(voice)")
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
  new Promise((resolve, reject) => {
    axios
      .get<PersonPopularResponse>(POPULAR)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const fetchPeopleExternalIds = (
  id: string | number
): Promise<PersonExternalIdsResponse> =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const res = await axios.get<PersonExternalIdsResponse>(
          PEOPLE_EXTERNALIDS(id)
        );
        resolve(res.data);
      } catch (err) {
        reject();
      }
    })();
  });

export const fetchPersonImage = (
  id: string | number
): Promise<PersonImagesResponse> =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const res = await axios.get<PersonImagesResponse>(PERSON_IMAGES(id));
        resolve(res.data);
      } catch {
        reject();
      }
    })();
  });

export const fetchPersonTvCredits = (
  id: string | number
): Promise<PersonTvCreditsResponse> =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const res = await axios.get<PersonTvCreditsResponse>(CASTTV(id));
        if (res.status !== 200) reject();
        resolve(res.data);
      } catch (err) {
        reject();
      }
    })();
  });

export const fetchTaggedimage = (id: string | number) =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const res = await axios.get(TAGGED_IMG(id));
        if (res.status !== 200) reject();
        resolve(res.data);
      } catch (err) {
        reject();
      }
    })();
  });

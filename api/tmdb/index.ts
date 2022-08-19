import { Content, DetailResponse, Genre } from '../../types/tmdb';

import axios from '../tmdbClient';
import { getAll } from '../Get';
import { DETAIL, SIMILAR } from '../Urls';

export const fetchDetails = (id: string | number, type: string): Promise<DetailResponse> =>
    new Promise((resolve, reject) => {
        axios
            .get<DetailResponse>(DETAIL(id, type))
            .then((response) => resolve(response.data))
            .catch((err) => reject(err));
    });

export const fetchSimilar = (
    id: string | number,
    type: string,
    genres: Genre[]
): Promise<Array<Content | undefined>> =>
    new Promise((resolve) => {
        let genreIds: Array<number | undefined> = [];
        const similar: Content[] = [];
        let vagueSimilar: Array<Content | undefined> = [];
        // if genre array is of format [{name:"movie_name",id:123},{name:"movie_name",id:456},...]
        // converting it to fomat [123,456,...]
        if (!genres.every((genre) => typeof genre === 'number')) {
            genreIds = genres.map((genre) => genre.id);
        }

        getAll<any>(
            Array.from({ length: 10 }, (_, i) => i + 1).map((page) => SIMILAR(id, type, page)),
            axios
        )
            .then((response) => {
                // response is array containg 10 results each result contains 20 movies
                response.forEach((score) => {
                    // results is array containing 20 movies
                    const { results } = score.data;
                    results?.forEach((movie: any) => {
                        // checking if all genre ids are present
                        if (
                            genreIds.every((genre) => movie?.genre_ids?.includes(genre as number))
                        ) {
                            similar.push(movie);
                        } else {
                            vagueSimilar.push(movie);
                        }
                    });
                });
            })
            .then(() => {
                const filtered = Array.from(new Set(similar.map((movie) => movie.id)))
                    .map((cur_id) => similar.find((movie) => movie.id === cur_id))
                    .filter((movie) => movie?.id !== parseInt(id as string, 10))
                    .sort((chinki: any, minki: any) => minki.vote_count - chinki.vote_count);

                if (filtered.length < 20) {
                    vagueSimilar = Array.from(new Set(vagueSimilar.map((movie) => movie?.id)))
                        .map((cur_id) => vagueSimilar.find((movie) => movie?.id === cur_id))
                        .filter((movie) => movie?.id !== parseInt(id as string, 10))
                        .sort((chinki: any, minki: any) => minki.vote_count - chinki.vote_count);

                    resolve([...filtered, ...vagueSimilar.slice(1, 21 - filtered.length)]);
                } else resolve(filtered);
            });
    });

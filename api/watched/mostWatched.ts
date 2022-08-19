import axios from 'axios';
import { SERVER_URI } from '../../config';

export const mostWatchedMovies = () =>
    new Promise((resolve, reject) => {
        (async () => {
            try {
                const res = await axios.get(`${SERVER_URI}  `);
                if (res.status !== 200) reject();
                const data = res.data.results;
                const newArr = data.filter((value: any) => Object.keys(value).length !== 0);
                let initialValue: any[] = [];
                let movieData: any[] = [];
                let tvData: any[] = [];

                let uniqueMovie: any[] = [];
                let uniqueTv: any[] = [];
                let finalObject: any[] = [];

                newArr.forEach((arrayItem: any[]) => {
                    initialValue = arrayItem;

                    const filteredMovie = initialValue.filter(
                        (value: any) => value.type === 'movie'
                    );
                    const filteredSeries = initialValue.filter((value: any) => value.type === 'tv');

                    movieData = [...filteredMovie, ...movieData];
                    tvData = [...filteredSeries, ...tvData];

                    uniqueMovie = [
                        ...new Map(movieData.map((item) => [item.content_id, item])).values(),
                    ];
                    uniqueTv = [...new Map(tvData.map((item) => [item.content_id, item])).values()];
                });
                finalObject = [{ movie: uniqueMovie }, { tv: uniqueTv }];

                resolve(finalObject);
            } catch (err) {
                reject();
            }
        })();
    });

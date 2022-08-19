import { createSlice } from '@reduxjs/toolkit';
import { Content } from '../../types/tmdb';

interface WatchlistState {
    current: string;
    movies: Content[];
    series: Content[];
    set: boolean;
}

const initialState: WatchlistState = {
    current: 'movie',
    movies: [],
    series: [],
    set: false,
};

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        setWatchlistMovies: (state, action) => {
            state.movies = action.payload;
        },
        setWatchlistSeries: (state, action) => {
            state.series = action.payload;
        },
        addMovieToWatchlist: (state, action) => {
            state.movies = [...state.movies, action.payload];
        },
        addShowToWatchlist: (state, action) => {
            state.series = [...state.series, action.payload];
        },
        setWatchlist: (state, action) => {
            state.movies = action.payload.movies;
            state.series = action.payload.series;
            state.set = true;
        },
        setWatchlistView: (state, action) => {
            state.current = action.payload;
        },
        removeFromWatchlist: (state, action) => {
            state[action.payload.view === 'movie' ? 'movies' : 'series'] = state[
                action.payload.view === 'movie' ? 'movies' : 'series'
            ].filter(
                (movie) =>
                    parseInt(movie.id?.toString() || '1', 10) !== parseInt(action.payload.id, 10)
            );
        },
    },
});

export default watchlistSlice.reducer;
export const {
    setWatchlistMovies,
    setWatchlistSeries,
    setWatchlist,
    setWatchlistView,
    addMovieToWatchlist,
    addShowToWatchlist,
    removeFromWatchlist,
} = watchlistSlice.actions;

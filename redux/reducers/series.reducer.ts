import { createSlice } from '@reduxjs/toolkit';
import { TvResult } from '../../types/tmdb';

interface InitialState {
    results: TvResult[] | [];
    filters: { genres: number[] };
    total: { results: number; pages: number };
}

const initialState: InitialState = {
    results: [],
    filters: { genres: [] },
    total: { results: 0, pages: 0 },
};

const serieslice = createSlice({
    name: 'series',
    initialState,
    reducers: {
        resetSeries: (state) => {
            state.results = [];
        },
        addSeries: (state, action) => {
            state.results = [...state.results, ...action.payload];
        },

        setSeriesGenres: (state, action) => {
            if (action.payload.length) {
                state.filters.genres = [...state.filters.genres, ...action.payload];
            }
        },

        toggleSeriesGenreId: (state, action) => {
            const { genres } = state.filters;
            const id = action.payload;
            if (genres.includes(id)) {
                genres.splice(genres.indexOf(id), 1);
            } else {
                genres.push(id);
            }
        },
        setSeriesGenre: (state, action) => {
            state.filters.genres = [action.payload];
        },
        setTotal: (state, action) => {
            state.total = action.payload;
        },
    },
});

export const {
    resetSeries,
    addSeries,
    toggleSeriesGenreId,
    setTotal,
    setSeriesGenre,
    setSeriesGenres,
} = serieslice.actions;

export default serieslice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { Episode, MediaType, MovieResult, TvResult } from '../../types/tmdb';

interface InitialState {
    content: Array<MovieResult & TvResult & Episode & MediaType>;
    stale: boolean;
}

const initialState: InitialState = {
    content: [],
    stale: true,
};

const recentSlice = createSlice({
    name: 'recents',
    initialState,
    reducers: {
        setRecents: (state, action) => {
            state.content = action.payload;
            state.stale = false;
        },
        markRecentStale: (state) => {
            state.stale = true;
        },
    },
});

export default recentSlice.reducer;
export const { setRecents, markRecentStale } = recentSlice.actions;

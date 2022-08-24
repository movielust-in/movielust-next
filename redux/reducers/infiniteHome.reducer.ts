import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieResult, TvResult } from '../../types/tmdb';

interface InitialState {
  currPage: number;
  totalPages: number;
  movie: Record<string, MovieResult[]>;
  tv: Record<string, TvResult[]>;
}

const initialState: InitialState = {
  currPage: 1,
  totalPages: 4,
  movie: {},
  tv: {},
};

const infiniteHomeSlice = createSlice({
  name: 'infiniteHome',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.currPage += 1;
    },
    setToalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    addContent: (
      state,
      action: PayloadAction<{
        id: string;
        type: 'movie' | 'tv';
        content: MovieResult[] | TvResult[];
      }>
    ) => {
      state[action.payload.type][action.payload.id] = action.payload.content;
    },
  },
});

export default infiniteHomeSlice.reducer;
export const { nextPage, addContent } = infiniteHomeSlice.actions;

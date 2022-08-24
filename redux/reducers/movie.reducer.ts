import { createSlice } from '@reduxjs/toolkit';
import { Filters } from '../../types/requestData';
import { MovieResult } from '../../types/tmdb';

interface IntialStateType {
  results: Record<string, MovieResult[]>;
  page: number;
  totalPages: number;
  filters: Filters;

  total: {
    results: number;
    pages: number;
  };
  trending: MovieResult[] | [];
  production: {
    movies: MovieResult[] | [];
    total: { results: number; pages: number };
  };
  castmovies: {
    movies: MovieResult[] | [];
    total: { results: number; pages: number };
  };
  //   homeMovies: {
  //     trendingToday: (MovieResult[] & TvResult[]) | [];
  //     latestMovies: MovieResult[] | [];
  //     latestSeries: MovieResult[] | [];
  //     TRM: MovieResult[] | [];
  //     popularSeries: TvResult[] | [];
  //     set: boolean;
  //     setFrom: string | null;
  //   };
}

const initialState: IntialStateType = {
  results: {},
  page: 1,
  totalPages: 0,
  filters: {
    genres: [],
    year: new Date().getFullYear(),
    sortBy: 'popularity.desc',
  },
  total: { results: 0, pages: 0 },
  trending: [],
  production: {
    movies: [],
    total: {
      results: 0,
      pages: 0,
    },
  },
  castmovies: {
    movies: [],
    total: {
      results: 0,
      pages: 0,
    },
  },
  //   homeMovies: {
  //     trendingToday: [],
  //     latestMovies: [],
  //     latestSeries: [],
  //     TRM: [],
  //     popularSeries: [],
  //     set: false,
  //     setFrom: null,
  //   },
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    resetMovies: (state) => {
      state.results = {};
      state.page = 1;
      state.totalPages = 0;
    },

    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },

    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },

    incrementPage: (state) => {
      state.page += 1;
    },

    addMovies: (state, action) => {
      state.results = {
        ...state.results,
        [action.payload.page]: action.payload.results,
      };
    },

    setSortByOption: (state, action) => {
      if (state.filters.sortBy !== action.payload)
        state.filters.sortBy = action.payload;
    },
    setMovieGenre: (state, action) => {
      state.filters.genres = [action.payload];
    },

    setMovieGenres: (state, action) => {
      if (action.payload.length) {
        state.filters.genres = [...state.filters.genres, ...action.payload];
      }
    },
    toggleMovieGenreId: (state, action) => {
      const { genres } = state.filters;
      const id = action.payload;
      if (genres.includes(id)) {
        genres.splice(genres.indexOf(id), 1);
      } else {
        genres.push(id);
      }
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setMovieYear: (state, action) => {
      state.filters.year = action.payload;
    },
    setTrending: (state, action) => {
      state.trending = action.payload;
    },
    // setHomeMovies: (state, action) => {
    //   state.homeMovies = action.payload;
    // },
    setProductionMovies: (state, action) => {
      state.production.movies = [...action.payload];
    },
    setProductionTotal: (state, action) => {
      state.production.total.results = action.payload.results;
      state.production.total.pages = action.payload.pages;
    },
    setCastMovies: (state, action) => {
      state.castmovies.movies = [...action.payload];
    },
    setCastMoviesTotal: (state, action) => {
      state.castmovies.total.results = action.payload.results;
      state.castmovies.total.pages = action.payload.pages;
    },
  },
});

export const {
  resetMovies,
  addMovies,
  toggleMovieGenreId,
  setTotal,
  incrementPage,
  setMovieGenre,
  setMovieGenres,
  setTrending,
  //   setHomeMovies,
  setProductionMovies,
  setProductionTotal,
  setCastMovies,
  setCastMoviesTotal,
  setCurrentPage,
  setTotalPages,
  setSortByOption,
} = movieSlice.actions;

export default movieSlice.reducer;

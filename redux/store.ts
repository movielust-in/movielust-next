import { configureStore } from '@reduxjs/toolkit';

import {
    TypedUseSelectorHook,
    useSelector as defaultUseSelector,
    useDispatch as defaultUseDispatch,
} from 'react-redux';

import movieReducer from './reducers/movie.reducer';
import userReducer from './reducers/user.reducer';
import navReducer from './reducers/nav.reducer';
import seriesReducer from './reducers/series.reducer';
import watchlistReducer from './reducers/watchlist.reducer';
import modalReducer from './reducers/modal.reducer';
import recentReducer from './reducers/recent.reducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer,
        series: seriesReducer,
        nav: navReducer,
        watchlist: watchlistReducer,
        modal: modalReducer,
        recents: recentReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Use instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => defaultUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = defaultUseSelector;

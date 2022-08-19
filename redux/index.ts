import {
    TypedUseSelectorHook,
    useSelector as defaultUseSelector,
    useDispatch as defaultUseDispatch,
} from 'react-redux';

import type { RootState, AppDispatch } from './store';

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useDispatch = () => defaultUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = defaultUseSelector;

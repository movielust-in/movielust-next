import { createSlice } from '@reduxjs/toolkit';

const navSlice = createSlice({
    name: 'nav',
    initialState: {
        currentPage: '',
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export default navSlice.reducer;
export const { setCurrentPage } = navSlice.actions;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,
};

const movieSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toogleModal: (state, action) => ({
            show: action.payload,
        }),
    },
});
export const { toogleModal } = movieSlice.actions;
export default movieSlice.reducer;

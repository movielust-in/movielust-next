import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    type: '',
};

const detailSlice = createSlice({
    name: 'detail',
    initialState,
    reducers: {
        setDetailParams: (state, action) => {
            state.id = action.payload.id;
            state.type = action.payload.type;
        },
    },
});

export default detailSlice.reducer;
export const { setDetailParams } = detailSlice.actions;

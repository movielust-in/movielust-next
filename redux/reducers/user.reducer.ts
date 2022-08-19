import { createSlice } from '@reduxjs/toolkit';

interface IntialState {
    id: string | null;
    name: string | null;
    email: string | null;
    avatar: string | null;
    isLoggedIn: boolean;
    isLoggingIn: boolean;
    token: string | null;
}

const initialState: IntialState = {
    id: null,
    name: null,
    email: null,
    avatar: null,
    isLoggedIn: false,
    isLoggingIn: false,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.isLoggingIn = false;
            state.token = action.payload.token;
        },
        setSignOut: (state) => {
            localStorage.removeItem('movielust_user');
            state.id = null;
            state.name = null;
            state.email = null;
            state.avatar = null;
            state.isLoggedIn = false;
            state.isLoggingIn = false;
            state.token = null;
        },
        toogleLoggingIn: (state) => {
            state.isLoggingIn = !state.isLoggingIn;
        },
    },
});

export const { setUserLogin, setSignOut, toogleLoggingIn } = userSlice.actions;

export const selectUserId = (state: { user: IntialState }) => state.user.id;
export const selectUserName = (state: { user: IntialState }) => state.user.name;
export const selectUserEmail = (state: { user: IntialState }) => state.user.email;
export const selectUserAvatar = (state: { user: IntialState }) => state.user.avatar;
export const selectIsLoggedIn = (state: { user: IntialState }) => state.user.isLoggedIn;
export const selectToken = (state: { user: IntialState }) => state.user.token;

export default userSlice.reducer;

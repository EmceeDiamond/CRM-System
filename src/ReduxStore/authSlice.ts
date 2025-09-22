import { createSlice } from '@reduxjs/toolkit';
import { AuthState, isAuthenticatedStatus } from '../Types/Interfase';
import { clearAccessToken } from '../Components/AccessToken';

const initialState: AuthState = {
    isAuthenticated: false,
    isAuthenticatedStatus: isAuthenticatedStatus.initializing
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
            state.isAuthenticatedStatus = isAuthenticatedStatus.authenticated;
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.isAuthenticatedStatus = isAuthenticatedStatus.initializing;
            clearAccessToken();
            localStorage.removeItem('refreshKey')
        }
    },
});

export const { toggleAuthenticated, logout } = authSlice.actions;
export default authSlice.reducer;
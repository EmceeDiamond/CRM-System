import { createSlice } from '@reduxjs/toolkit';
import { isAuthenticatedStatus } from '../../../Types/Interfase';
import { clearAccessToken } from '../../../Components/AccessToken';
import { initialStateAuthSlice } from '../../InitialState';

const authSlice = createSlice({
    name: 'auth',
    initialState: initialStateAuthSlice,
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
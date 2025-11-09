import { createSlice } from '@reduxjs/toolkit';
import { isAuthenticatedStatus } from '../../../Types/Interfase';
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
        },

        initializingAuth: (state) => {
            state.isAuthenticatedStatus = isAuthenticatedStatus.initializing
            console.log("init")
        }
    },
});

export const { toggleAuthenticated, logout, initializingAuth } = authSlice.actions;
export default authSlice.reducer;
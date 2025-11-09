import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Authorization/Slices/authSlice'
import taskReducer from './Authorization/Slices/taskSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type storeReduxType = typeof store;

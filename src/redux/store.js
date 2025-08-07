import { configureStore } from '@reduxjs/toolkit';
import threadsReducer from './threadsSlice';

export const store = configureStore({
    reducer: {
        threads: threadsReducer,
    },
});
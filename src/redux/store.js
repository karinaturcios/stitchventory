import { configureStore } from '@reduxjs/toolkit';
import threadsReducer from './threadsSlice';
import projectsReducer from './projectsSlice';

export const store = configureStore({
    reducer: {
        threads: threadsReducer,
        projects: projectsReducer,
    },
});
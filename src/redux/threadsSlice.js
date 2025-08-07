import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    threads: JSON.parse(localStorage.getItem('threads')) || [],
};

const threadsSlice = createSlice({
    name: 'threads',
    initialState,
    reducers: {
        setThreads: (state, action) => {
            state.threads = action.payload;
        },
        addThreads: (state, action) => {
            const newThreads = Array.isArray(action.payload) ? action.payload : [action.payload];
            newThreads.forEach((newThread) => {
                const index = state.threads.findIndex(t => t.dmcCode === newThread.dmcCode);
                if (index !== -1) {
                    state.threads[index].quantity += Number(newThread.quantity);
                } else {
                    state.threads.push(newThread);
                }
            })
        },
        deleteThread: (state, action) => {
            state.threads = state.threads.filter(t => t.dmcCode !== action.payload);
        },
        clearThreads: (state) => {
            state.threads = [];
            localStorage.removeItem('threads');
        },
    },
});

export const { setThreads, addThreads, clearThreads, deleteThread} = threadsSlice.actions;

//SELECTORS
export const selectAllThreadCodes = (state) => state.threads.threads.map(t => t.dmcCode);
export const selectQuantityByCode = (state, dmcCode) => {
    const thread = state.threads.threads.find(t => t.dmcCode === dmcCode);
    return thread ? thread.quantity : 0;
};
export const selectThreadCheck = (state, requiredColors) => {
    const ownedColors = state.threads.threads.map(t => t.dmcCode);
    const missing = requiredColors.filter(code => !ownedColors.includes(code));
    const fulfilled = requiredColors.filter(code => ownedColors.includes(code));
    return { missing, fulfilled };
};

export default threadsSlice.reducer;
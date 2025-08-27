import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projects: JSON.parse(localStorage.getItem('projects')) || [],
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
            localStorage.setItem('projects', JSON.stringify(state.projects));
        },
        addProject: (state, action) => {
            state.projects.push({...action.payload});
            localStorage.setItem('projects', JSON.stringify(state.projects));
        },
        deleteProject: (state, action) => {
            state.projects = state.projects.filter(p => p.title !== action.payload);
            localStorage.setItem('projects', JSON.stringify(state.projects));
        },
        clearProjects: (state) => {
            state.projects = [];
            localStorage.removeItem('projects');
        },
    },
});

export const { setProjects, addProject, clearProjects, deleteProject} = projectsSlice.actions;

export default projectsSlice.reducer;
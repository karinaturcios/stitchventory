import ProjectList from "../components/ProjectList.jsx";
import ProjectDetail from "../components/ProjectDetail.jsx";
import AddProjectForm from "../components/AddProjectForm.jsx";  
import "../styles/projectspage.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject, clearProjects, deleteProject, setProjects as setProjectsRedux } from "../redux/projectsSlice.js";

export default function ProjectsPage() {
const dispatch = useDispatch();
const projects = useSelector(state => state.projects.projects);
const [selectedProject, setSelectedProject] = useState(null);
const [showAddProjectForm, setShowAddProjectForm] = useState(false);
const inventory = useSelector(state => state.threads); // Grabs the threads from inventory
const inventoryCodes = inventory.threads.map(thread => thread.dmcCode);

const checkThreads = (required, owned) => {
    const missing = required.filter(code => !owned.includes(code));
    const fulfilled = required.filter(code => owned.includes(code));
    return { missing, fulfilled };
}

const handleProjectSelect = (project) => {
    setSelectedProject(project);
    console.log("Selected project:", project); // Debugging log
    const requiredThreads = project.keyTable.map(entry => entry.dmcCode);
    checkThreads(requiredThreads, inventoryCodes); // Calls the function to get missing threads
};

const handleAddProject = (newProject) => {
    dispatch(addProject(newProject));
};

const handleDeleteProject = (projectTitle) => {
    dispatch(deleteProject(projectTitle));
    if (selectedProject && selectedProject.title === projectTitle) {
        setSelectedProject(null);
    }
};

useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
}, [projects]); // Save projects to localStorage whenever they change

// LOAD PROJECTS FROM STORAGE
useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    dispatch(setProjectsRedux(savedProjects));
}, [dispatch]);

useEffect(() => {
        if (selectedProject && !projects.some(p => p.title === selectedProject.title)) {
            setSelectedProject(null);
        }
    }, [projects, selectedProject]); // Reset selected project if it is not in the current projects

useEffect(() => {
    const savedId = localStorage.getItem('selectedProjectId');
    if (savedId) {
        const projectToSelect = projects.find(p => p.id === savedId);
        if (projectToSelect) {
            setSelectedProject(projectToSelect);
        }
        localStorage.removeItem('selectedProjectId');
    }
}, [projects]);

    return(
        <div className="grid grid-cols-2 h-dvh">
            <div className="bg-cyan-400 py-25 px-10">
                <h2 className="pageTitle">Current Projects</h2>
                <div className="searchBar">
                    <input className="searchInput" placeholder="Search for Projects"/>
                    <button className="searchButton">Search</button>
                </div>
                <button onClick={() => setShowAddProjectForm(true)} className="bg-gray-400">Add Project</button>
                <button onClick={() => dispatch(clearProjects())} className="bg-gray-400">Clear All Project Projects</button>
                <ProjectList
                    projects={projects}
                    handleProjectSelect={handleProjectSelect}
                    inventoryCodes={inventoryCodes}
                    checkThreads={checkThreads}
                    handleDeleteProject={handleDeleteProject}
                />
            </div>
            <div className="bg-violet-400 py-30 px-10">
                <div>
                    {showAddProjectForm ? (<AddProjectForm 
                    onAddProject={handleAddProject} 
                    onClose={() => setShowAddProjectForm(false)} />) : (null)}
                </div>
                {selectedProject ? (
                <ProjectDetail
                project={selectedProject}
                />
                ) : (
                    <p>Select a project to see details</p>
                )}
            </div>
        </div>
    );
};
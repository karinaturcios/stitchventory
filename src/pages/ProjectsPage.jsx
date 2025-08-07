import ProjectList from "../components/ProjectList.jsx";
import ProjectDetail from "../components/ProjectDetail.jsx";
import AddProjectForm from "../components/AddProjectForm.jsx";  
import "../styles/projectspage.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProjectsPage() {
const [selectedProject, setSelectedProject] = useState(null);
const [showAddProjectForm, setShowAddProjectForm] = useState(false);
const [projects, setProjects] = useState(() => {
    return JSON.parse(localStorage.getItem('projects')) || [];
});

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

const addProject = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
};

useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
}, [projects]); // Save projects to localStorage whenever they change

useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
    }
}, []); // Load projects from localStorage on initial render

useEffect(() => {
        if (selectedProject && !projects.some(p => p.title === selectedProject.title)) {
            setSelectedProject(null);
        }
    }, [projects, selectedProject]); // Reset selected project if it is not in the current projects

    return(
        <div className="grid grid-cols-2 h-dvh">
            <div className="bg-cyan-400 py-25 px-10">
                <h2 className="pageTitle">Current Projects</h2>
                <div className="searchBar">
                    <input className="searchInput" placeholder="Search for Projects"/>
                    <button className="searchButton">Search</button>
                </div>
                <button onClick={() => setShowAddProjectForm(true)} className="bg-gray-400">Add Project</button>
                <button onClick={() => setProjects([])} className="bg-gray-400">Clear All Project Projects</button>
                <ProjectList
                    projects={projects}
                    handleProjectSelect={handleProjectSelect}
                    inventoryCodes={inventoryCodes}
                    checkThreads={checkThreads}
                />
            </div>
            <div className="bg-violet-400 py-30 px-10">
                <div>
                    {showAddProjectForm ? (<AddProjectForm onAddProject={addProject} onClose={() => setShowAddProjectForm(false)} />) : (null)}
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
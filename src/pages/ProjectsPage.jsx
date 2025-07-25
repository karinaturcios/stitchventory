import ProjectList from "../components/ProjectList.jsx";
import ProjectDetail from "../components/ProjectDetail.jsx";
import AddProjectForm from "../components/AddProjectForm.jsx";  
import "../styles/projectspage.css";
import { useState } from "react";

export default function ProjectsPage() {
const [selectedProject, setSelectedProject] = useState(null);
const [showAddProjectForm, setShowAddProjectForm] = useState(false);
const [projects, setProjects] = useState([]);

const handleProjectSelect = (project) => {
    setSelectedProject(project);
}

    return(
        <div className="grid grid-cols-2 h-dvh">
            <div className="bg-cyan-400 py-25 px-10">
                <h2 className="pageTitle">Current Projects</h2>
                <div className="searchBar">
                    <input className="searchInput" placeholder="Search for Projects"/>
                    <button className="searchButton">Search</button>
                </div>
                <button onClick={() => setShowAddProjectForm(true)} className="bg-gray-400">Add Project</button>
                <ProjectList
                    projects={projects}
                    handleProjectSelect={handleProjectSelect}
                />
            </div>
            <div className="bg-violet-400 py-30 px-10">
                <div>
                    {showAddProjectForm && <AddProjectForm />}
                </div>
                <ProjectDetail
                project={selectedProject}/>
            </div>
        </div>
    );
};
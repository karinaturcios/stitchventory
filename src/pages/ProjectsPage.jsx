import ProjectList from "../components/ProjectList.jsx";

export default function ProjectsPage() {
    return(
        <div>
            <h2>Current Projects</h2>
            <input placeholder="Search for Projects"/>
            <button>Add Project</button>
            <ProjectList/>
        </div>
    );
};
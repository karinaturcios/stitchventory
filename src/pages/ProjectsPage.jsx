import ProjectList from "../components/ProjectList.jsx";
import ProjectDetail from "../components/ProjectDetail.jsx";
import "../styles/projectspage.css";

export default function ProjectsPage() {
    return(
        <div className="projectPage">
            <div className="currentProjects">
                <h2 className="pageTitle">Current Projects</h2>
                <div className="searchBar">
                    <input className="searchInput" placeholder="Search for Projects"/>
                    <button className="searchButton">Search</button>
                </div>
                <button>Add Project</button>
                <ProjectList/>
            </div>
            <div className="selectedProject">
                <ProjectDetail/>
            </div>
        </div>
    );
};
import "../styles/projectdetail.css";
import ProjectKeyTable from "./ProjectKeyTable";

const ProjectDetail = ({ project }) => {
    if (!project) {
        return <div>Select a project to see more details</div>
    }

    return (
        <div>
            <h2>{project.title}</h2>
            <img className="mx-auto selectedProjectThumbnail" src={project.thumbnail}/>
            <ProjectKeyTable />
        </div>
    );
};

export default ProjectDetail;
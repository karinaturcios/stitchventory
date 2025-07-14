import "../styles/projectcard.css";

const ProjectCard = () => {
    return (
        <div>
            <h3>Project Title</h3>
            <img 
            className="mx-auto projectThumbnail" 
            src="/src/assets/image-placeholder.svg" 
            alt="Project Thumbnail"

            />
            <p>Status: In Progress</p>
        </div>
    );
};

export default ProjectCard;
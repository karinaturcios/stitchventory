import "../styles/projectdetail.css";

const ProjectDetail = () => {
const projectTitle = "Flower Sampler";

    return (
        <div>
            <h2>{projectTitle}</h2>
            <img className="mx-auto selectedProjectThumbnail" src="src/assets/image-placeholder.svg"/>
            <p>Key Table goes here.</p>
        </div>
    );
};

export default ProjectDetail;
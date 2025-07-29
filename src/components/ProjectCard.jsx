import "../styles/projectcard.css";

const ProjectCard = ({ title, thumbnail, colorsOwned, totalColors }) => {
    console.log("thumbnail url:", thumbnail);
    return (
        <div>
            <h3>{title}</h3>
            <img 
            className="mx-auto projectThumbnail" 
            src={thumbnail}
            alt="Project Thumbnail"
            />
            <p>{colorsOwned}/{totalColors} Colors Owned</p>
        </div>
    );
};

export default ProjectCard;
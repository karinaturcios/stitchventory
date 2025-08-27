import "../styles/projectcard.css";

const ProjectCard = ({ title, thumbnail, colorsOwned, totalColors, handleDeleteProject }) => {
    return (
        <div className="group flex flex-col items-center">
            <h3>{title}</h3>
            <img 
            className="mx-auto projectThumbnail" 
            src={thumbnail}
            alt="Project Thumbnail"
            />
            <p>{colorsOwned}/{totalColors} Colors Owned</p>
            <button
                className="hidden group-hover:block bg-red-500 text-white px-2 py-1 rounded mt-2" 
                onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProject(title);
                }}>X</button>
        </div>
    );
};

export default ProjectCard;
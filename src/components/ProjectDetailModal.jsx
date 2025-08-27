const ProjectDetailModal = ({ project, onClose}) => {
    if (!project) return null;

    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <h2>{project.title}</h2>
                <img 
                src={project.thumbnail} 
                alt={project.title} 
                style={{width: '200px', 
                    height: '200px', 
                    marginBottom: '10px'}}/>
                <p>Colors Used: {project.colorCount}</p>
                <ul>
                    {project.keyTable.map((key, i) => (
                        <li key={i}>{key.dmcCode}</li>
                    ))}
                </ul>
                <button className="bg-gray-500" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ProjectDetailModal;
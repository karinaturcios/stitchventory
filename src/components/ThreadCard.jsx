const ThreadCard = ({ thread, projectsUsed, handleViewDetails, onQuantityChange }) => {
    if(!thread) return null;

    return (
        <div>
            <p>Thread Name: {thread.colorName}</p>
            <p>DMC #: {thread.dmcCode}</p>
            <p>Swatch:
                <span
                    style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        backgroundColor: thread.hex,
                        border: "1px solid #000"
                    }}
                ></span>
            </p>
            <p>Quantity:
                <button onClick={() => onQuantityChange(-1)}>-</button>
                <span style={{ margin: "0 10px" }}>{thread.quantity}</span>
                <button onClick={() => onQuantityChange(1)}>+</button>
            </p>
            <p>This thread is used in the following projects:</p>
            <ul>
                {projectsUsed.length > 0 ? (
                    projectsUsed.map((project, index) => (
                        <li 
                        key={index}
                        className="hover:bg-pink-200 group"
                        style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center', 
                            marginBottom: '5px'
                        }}
                        onClick={() => handleViewDetails(project.id)}
                        >
                            <img 
                                src={project.thumbnail} 
                                alt={project.title} 
                                style={{width: '100px', height: '100px', marginRight: '10px'}}
                                />
                            <span>{project.title}</span>
                            <button
                            className="bg-red-500 
                            text-white 
                            px-2 
                            py-1 
                            rounded 
                            opacity-0 
                            group-hover:opacity-100 
                            transition-opacity duration-300"
                            onClick={() => {handleViewDetails(project.id)}}>View Details</button>
                        </li>
                    ))
                ) : (
                    <li>This thread is not used in any projects.</li>
                )}
            </ul>
        </div>
    );
};

export default ThreadCard;
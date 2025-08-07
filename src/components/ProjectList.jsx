import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects, handleProjectSelect, inventoryCodes, checkThreads }) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap 4">
            {projects.map((project) => {
                const { fulfilled } = checkThreads(project.keyTable.map(item => item.dmcCode), inventoryCodes);

                return (
                <ul key={project.title}>
                    <li className="hover:bg-pink-200 p-4 rounded-lg cursor-pointer"
                        onClick={() => handleProjectSelect(project)}
                    >
                        <ProjectCard
                            title={project.title}
                            thumbnail={project.thumbnail}
                            colorsOwned= {fulfilled.length}
                            totalColors={project.keyTable.length}
                        />
                    </li>
                </ul>
            )
            }
)}
        </div>
    );
};

export default ProjectList;
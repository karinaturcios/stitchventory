import ThreadCard from './ThreadCard.jsx';

const ThreadDetails = ({ thread, projectsUsed, handleViewDetails, onQuantityChange }) => {
    if (!thread) return null; // If no thread is selected, return null to avoid rendering


    return (
        <div>
            <h2>Thread Details</h2>
            <ThreadCard 
                thread={thread} 
                projectsUsed={projectsUsed}
                handleViewDetails={handleViewDetails}
                onQuantityChange={onQuantityChange}
            />
        </div>
    );
};

export default ThreadDetails;
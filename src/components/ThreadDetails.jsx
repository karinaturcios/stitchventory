import ThreadCard from './ThreadCard.jsx';

const ThreadDetails = ({ thread }) => {
    if (!thread) return null; // If no thread is selected, return null to avoid rendering
    console.log("ThreadDetails component received thread:", thread);

    return (
        <div>
            <h1>Thread Details</h1>
            <ThreadCard thread={thread} />
        </div>
    );
};

export default ThreadDetails;
import ThreadList from '../components/ThreadList.jsx';
import ThreadDetails from '../components/ThreadDetails.jsx';

export default function InventoryPage() {
    const threadCount = 0; //placeholder for actual thread count

    return(
        <div>
            <h2>Current Inventory</h2>
            <input placeholder="Search for Threads"/>
            <button>Add Thread</button>
            <p>You currently have {threadCount} out of 500 colors. Way to go!</p>
            <ThreadList/>
            <ThreadDetails/>
        </div>
    )
};
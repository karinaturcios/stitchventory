import ThreadList from '../components/ThreadList.jsx';
import ThreadDetails from '../components/ThreadDetails.jsx';
import { useState } from 'react';

export default function InventoryPage() {
    const [selectedThread, setSelectedThread] = useState(null); // State for selected thread to show details

    const threads = [
        {
            dmcCode: "310",
            hex: "#000000",
            colorName: "Black",
            quantity: 5
        },
        {
            dmcCode: "321",
            hex: "#C72B3B",
            colorName: "Red",
            quantity: 2
        },
        {
            dmcCode: "796",
            hex: "#11416D",
            colorName: "Royal Blue Dark",
            quantity: 1
        },
        {
            dmcCode: "3818",
            hex: "#115A3B",
            colorName: "Ultra Very Dark Emerald Green",
            quantity: 1
        }
    ] // Placeholder data
    
    const threadCount = threads.length; // Counts number of threads owned

    return(
        <div>
            <h2>Current Inventory</h2>
            <input placeholder="Search for Threads"/>
            <button>Add Thread</button>
            <div>
                {threadCount > 0 ? (
                    <div>
                    <ThreadList 
                    threads={threads} 
                    threadCount={threadCount}
                    onThreadSelect={setSelectedThread}/>
                    </div>
                ) : (
                    <p>You currently have no threads in your inventory. Add some now!</p>
                ) }
            </div>
            <div>
                {selectedThread ? (
                <div>
                    <ThreadDetails thread={selectedThread}/>
                </div>
            ) : (
                <p>Select a thread to see details.</p>
            ) }
            </div>
        </div>
    )
}
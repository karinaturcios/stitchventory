import ThreadList from '../components/ThreadList.jsx';
import ThreadDetails from '../components/ThreadDetails.jsx';
import AddThreadForm from '../components/AddThreadForm.jsx';
import { useState, useEffect } from 'react';
import flossList from '../data/flossList.json'; // Assuming you have a data file for threads

export default function InventoryPage() {
    const [selectedThread, setSelectedThread] = useState(null); // State for selected thread to show details
    const [showAddThreadForm, setShowAddThreadForm] = useState(false); // State to toggle Add Thread Form visibility

    const transformedFlossList = Object.values(flossList).map((thread) => ({
        dmcCode: thread.number,
        colorName: thread.readableName,
        searchName: thread.searchName,
        hex: `#${thread.hex}`
    })); //Transform the flossList data to match the expected structure

    const [threads, setThreads] = useState([]); // Added threads in the user's inventory
    
    const threadCount = threads.length; // Counts number of colors owned

    const showForm = () => {
        setShowAddThreadForm(!showAddThreadForm);
    }; // Toggle the visibility of the Add Thread Form

    const handleAddThread = (newThread) => {
        setThreads((prevThreads) => {
            const existingThreads = prevThreads.find(
                (t) => t.dmcCode === newThread.dmcCode
            );
            if (existingThreads) {
                return prevThreads.map((t) =>
                t.dmcCode === newThread.dmcCode
                    ? { ...t, quantity: t.quantity + newThread.quantity } // Increment quantity if thread already exists
                    : t
                );
            } else {
                return [...prevThreads, newThread]; // Add new thread if it doesn't exist
            }
        });

        setShowAddThreadForm(false); // hide form after adding thread
    }; // Function to add the new thread to the inventory

    return(
        <div className="grid grid-cols-2 h-dvh">
            <div className="bg-cyan-400 py-25 px-10">
                <h2 className="text-[60px] mb-7">Current Inventory</h2>
                <input type="search" className="border-2" placeholder="Search for Threads"/>
                <button onClick={showForm}>Add Thread</button>
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
            </div>
            <div className="bg-violet-400 py-30 px-10">
                {selectedThread ? (
                <div>
                    <ThreadDetails thread={selectedThread}/>
                </div>
            ) : (
                <p>Select a thread to see details.</p>
            ) }
            <div>
                {showAddThreadForm && <AddThreadForm masterThreadData={transformedFlossList} onAddThread={handleAddThread}/>}
            </div>
            </div>
        </div>
    )
}
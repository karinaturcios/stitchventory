import ThreadList from '../components/ThreadList.jsx';
import ThreadDetails from '../components/ThreadDetails.jsx';
import AddThreadForm from '../components/AddThreadForm.jsx';
import { useState, useEffect } from 'react';
import flossList from '../data/flossList.json'; // Assuming you have a data file for threads
import SearchBar from '../components/SearchBar.jsx';

export default function InventoryPage() {

    const [selectedThread, setSelectedThread] = useState(null); // State for selected thread to show details
    const [threads, setThreads] = useState(() => {
        return JSON.parse(localStorage.getItem('threads')) || [];
    }); // Added threads in the user's inventory or an empty array if none exist
    const [searchTerm, setSearchTerm] = useState();

    useEffect(() => {
        if (selectedThread && !threads.some(t => t.dmcCode === selectedThread.dmcCode)) {
            setSelectedThread(null);
        }
    }, [threads, selectedThread]); // Effect to reset selected thread if it is not in the current threads

    const transformedFlossList = Object.values(flossList).map((thread) => ({
        dmcCode: thread.number,
        colorName: thread.readableName,
        searchName: thread.searchName,
        hex: `#${thread.hex}`
    })); //Transform the flossList data to match the expected structure

    
    const threadCount = threads.length; // Counts number of colors owned
    const totalColors = transformedFlossList.length; // Total number of colors in the inventory


    const handleAddThread = (newThreads) => {
        setThreads((prevThreads) => {
            const updated = [...prevThreads]; // creates a copy of the previous threads

            if(!Array.isArray(newThreads)) {
                newThreads = [newThreads]; // Ensure newThreads is always an array
            }

            newThreads.forEach((newThread) => {
                const index = updated.findIndex(t => t.dmcCode === newThread.dmcCode); // checks if the new thread already exists in the inventory

                if (index !== -1) {
                    updated[index] = {
                        ...updated[index],
                        quantity: Number(updated[index].quantity) + Number(newThread.quantity)
                    };
                } else {
                    updated.push(newThread);
                }; // If it exists, update the quantity, otherwise add the new thread
            });
            return updated;
        });

    }; // Function to add the new thread to the inventory

    const handleDeleteThread = (dmcCode) => {
        setThreads((prevThreads) => 
            prevThreads.filter((thread) => thread.dmcCode !== dmcCode)
        );
    }; // Function to delete a thread from the inventory

    useEffect(() => {
        localStorage.setItem('threads', JSON.stringify(threads)); // Save threads to local storage
    }, [threads]);

    return(
        <div className="grid grid-cols-2 h-dvh">
            <div className="bg-cyan-400 py-25 px-10">
                <h2 className="text-[60px] mb-7">Current Inventory</h2>
                <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                />
                <button className="bg-gray-500 hover:bg-purple-400" onClick={() => setThreads([])}>Clear Inventory</button>
                <div>
                    {threadCount > 0 ? (
                        <div>
                        <ThreadList 
                        threads={threads} 
                        threadCount={threadCount}
                        totalColors={totalColors}
                        onThreadSelect={setSelectedThread}
                        onDeleteThread={handleDeleteThread}
                        searchTerm={searchTerm}/>
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
                <AddThreadForm 
                    masterThreadData={transformedFlossList}
                    onAddThread={handleAddThread}
                />
            </div>
            </div>
        </div>
    )
}
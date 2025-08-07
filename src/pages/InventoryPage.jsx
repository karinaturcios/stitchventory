import ThreadList from '../components/ThreadList.jsx';
import ThreadDetails from '../components/ThreadDetails.jsx';
import AddThreadForm from '../components/AddThreadForm.jsx';
import { useState, useEffect } from 'react';
import flossList from '../data/flossList.json'; // Assuming you have a data file for threads
import SearchBar from '../components/SearchBar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addThreads, deleteThread } from '../redux/threadsSlice.js';
import { setThreads as setThreadsRedux } from '../redux/threadsSlice.js';

export default function InventoryPage() {
    const dispatch = useDispatch();
    const threads = useSelector(state => state.threads.threads); // Get threads from Redux store
    const [selectedThread, setSelectedThread] = useState(null); // State for selected thread to show details
    const [searchTerm, setSearchTerm] = useState();

    useEffect(()=> {
        const savedThreads = JSON.parse(localStorage.getItem('threads')) || [];
        dispatch(setThreadsRedux(savedThreads)); // Load threads from local storage into Redux store
    }, [dispatch]); // Effect to load threads from local storage on component mount

    useEffect(() => {
        if (selectedThread && !threads.some(t => t.dmcCode === selectedThread.dmcCode)) {
            setSelectedThread(null);
        }
    }, [threads, selectedThread]); // Effect to reset selected thread if it is not in the current threads

    useEffect(() => {
        localStorage.setItem('threads', JSON.stringify(threads));
    }, [threads]); // Save threads to local storage whenever they change

    const transformedFlossList = Object.values(flossList).map((thread) => ({
        dmcCode: thread.number,
        colorName: thread.readableName,
        searchName: thread.searchName,
        hex: `#${thread.hex}`
    })); //Transform the flossList data to match the expected structure

    
    const threadCount = threads.length; // Counts number of colors owned
    const totalColors = transformedFlossList.length; // Total number of colors in the inventory

    // ADD NEW THREADS TO INVENTORY
    const handleAddThread = (newThreads) => {
        dispatch(addThreads(newThreads));
    };

    // DELETE THREADS FROM INVENTORY
    const handleDeleteThread = (dmcCode) => {
        dispatch(deleteThread(dmcCode)); // Update the Redux store with the filtered threads
    };

    return(
        <div className="grid grid-cols-2 h-dvh">
            <div className="bg-cyan-400 py-25 px-10">
                <h2 className="text-[60px] mb-7">Current Inventory</h2>
                <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                />
                <button className="bg-gray-500 hover:bg-purple-400" onClick={() => dispatch(setThreadsRedux([]))}>Clear Inventory</button>
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
    );
};
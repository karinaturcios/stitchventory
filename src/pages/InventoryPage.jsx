import ThreadList from '../components/ThreadList.jsx';
import ThreadDetails from '../components/ThreadDetails.jsx';
import AddThreadForm from '../components/AddThreadForm.jsx';
import ProjectDetailModal from '../components/ProjectDetailModal.jsx';
import { useState, useEffect } from 'react';
import flossList from '../data/flossList.json';
import SearchBar from '../components/SearchBar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addThreads, deleteThread, updateThreadQuantity, setThreads as setThreadsRedux } from '../redux/threadsSlice.js';
import { useNavigate } from 'react-router-dom';

export default function InventoryPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const threads = useSelector(state => state.threads.threads); // Get threads from Redux store
    const currentProjects = useSelector(state => state.projects.projects); // Get current projects from Redux store
    
    const [selectedThreadCode, setSelectedThreadCode] = useState(null); // State for selected thread to show details
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);

    const selectedThread = threads.find(t => t.dmcCode === selectedThreadCode) || null;

    // LOAD THREADS FROM STORAGE
    useEffect(()=> {
        const savedThreads = JSON.parse(localStorage.getItem('threads')) || [];
        dispatch(setThreadsRedux(savedThreads)); // Load threads from local storage into Redux store
    }, [dispatch]);

    // SAVE THREADS TO STORAGE
    useEffect(() => {
        localStorage.setItem('threads', JSON.stringify(threads));
    }, [threads]);

    //RESET MODAL IF DIFFERENT THREAD IS SELECTED
    useEffect(() => {
        if (selectedThread) {
            setIsModalOpen(false);
        }
    }, [selectedThread]);

    const transformedFlossList = Object.values(flossList).map((thread) => ({
        dmcCode: thread.number,
        colorName: thread.readableName,
        searchName: thread.searchName,
        hex: `#${thread.hex}`
    }));

    const threadCount = threads.length; // Counts number of colors owned
    const totalColors = transformedFlossList.length; // Total number of colors in the inventory

    // ADD NEW THREADS TO INVENTORY
    const handleAddThread = (newThreads) => {
        dispatch(addThreads(newThreads));
    };

    // DELETE THREADS FROM INVENTORY
    const handleDeleteThread = (dmcCode) => {
        dispatch(deleteThread(dmcCode));
        if (selectedThreadCode === dmcCode) setSelectedThreadCode(null);
    };

    // FIND PROJECTS USING SELECTED THREAD
    const projectsUsingThread = (thread) => {
        if (!thread) return [];
        return currentProjects.filter(project => 
            project.keyTable.some(entry => entry.dmcCode === thread.dmcCode)
        ).map(project => project);
    };

    // HANDLE CLICK ON PROJECT NAME IN THREAD DETAILS
    const handleProjectClick = (projectTitle) => {
        const project = currentProjects.find(p => p.title === projectTitle);
        if (project) {
            setSelectedProject(project);
            setIsModalOpen(true);
        };
    };

    // CLOSE PROJECT DETAIL MODAL
    const closeModal = () => {
        setSelectedProject(null);
        setIsModalOpen(false);
    };

    // UPDATE THREAD QUANTITY
    const handleQuantityChange = (delta) => {
        if (!selectedThread) return;
        const newQuantity = Math.max(0, selectedThread.quantity + delta);
        if (newQuantity === 0) {
            handleDeleteThread(selectedThread.dmcCode);
        } else {
            dispatch(updateThreadQuantity({ dmcCode: selectedThread.dmcCode, quantity: newQuantity }));
        }
    };

    const handleViewDetails = (projectId) => {
        localStorage.setItem('selectedProjectId', projectId);
        window.location.href = '/projects';
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
                <button className="bg-gray-500 hover:bg-purple-400 ml-4" onClick={() => setIsAddFormOpen(!isAddFormOpen)}>Add Inventory</button>
                <div>
                    {threadCount > 0 ? (
                        <div>
                        <ThreadList 
                        threads={threads} 
                        threadCount={threadCount}
                        totalColors={totalColors}
                        onThreadSelect={setSelectedThreadCode}
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
                    <ThreadDetails 
                    thread={selectedThread}
                    projectsUsed={projectsUsingThread(selectedThread)}
                    handleViewDetails={handleViewDetails}
                    onQuantityChange={handleQuantityChange}
                    />

                    {isModalOpen && selectedProject && (
                        <ProjectDetailModal
                        project={selectedProject}
                        onClose={closeModal}/>
                    )}
                </div>
            ) : (
                <p>Select a thread to see details.</p>
            ) }
            <div>
                {isAddFormOpen && (
                <AddThreadForm 
                    masterThreadData={transformedFlossList}
                    onAddThread={handleAddThread}
                />
                )}
            </div>
            </div>
        </div>
    );
};
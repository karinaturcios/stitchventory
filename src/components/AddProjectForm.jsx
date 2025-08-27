import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddProjectPageOne from './AddProjectPageOne.jsx';
import AddProjectPageTwo from './AddProjectPageTwo.jsx';

const AddProjectForm = ({ onAddProject, onClose }) => {
// State to manage the current step and project data
const [step, setStep] = useState(1);
const [projectData, setProjectData] = useState({
    title: '',
    thumbnail: '',
    colorCount: 0,
    keyTable: [],
});

// Go to next step with project info
const handlePageOneSubmit = (data) => {
    setProjectData((prev) => ({...prev, ...data}));
    setStep(2);
};

// Submits project data & key table data
const handleFinalSubmit = (keyTableData) => {
    const finalProject = {
        id: uuidv4(),
        ...projectData,
        keyTable: keyTableData
    };
    onAddProject(finalProject);
    onClose();
    console.log('Final Project Data:', finalProject);
};

return (
        <div className="bg-pink-400 p-5">
            {step === 1 && <AddProjectPageOne onNext={handlePageOneSubmit}/>}
            {step === 2 && (<AddProjectPageTwo 
            colorCount={projectData.colorCount}
            onSubmit={handleFinalSubmit}
            />
            )}
        </div>
    );
};

export default AddProjectForm;
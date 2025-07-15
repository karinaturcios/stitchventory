import { useState } from "react";

const AddThreadForm = ({onAddThread, masterThreadData}) => {
    const [dmcCode, setDmcCode] = useState(""); // State for DMC code input
    const [quantity, setQuantity] = useState(1); // State for quantity input

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const match = masterThreadData.find(
            (thread) => thread.dmcCode === dmcCode.trim()
        ); // Find the thread in the master data by DMC code

        if (match) {
            const newThread = {...match, quantity: parseInt(quantity)}; // Create a new thread object with the matched data and quantity
            onAddThread(newThread); // Calls the onAddThread function to add the new thread to the inventory
            setDmcCode(""); // Reset DMC code input
            setQuantity(1); // Reset quantity input
        } else {
            alert("Thread not found. Please check the DMC code.");
        } // Alert if the DMC code does not match any thread in the master data
    };

    return (
        <div className="bg-pink-500 p-5 rounded shadow-md">
            <h2>Add New Thread</h2>
            <form onSubmit={handleSubmit}>
                <label>DMC Code</label>
                <input 
                    type="text" 
                    placeholder="DMC Code"
                    value={dmcCode}
                    onChange={((e) => setDmcCode(e.target.value))}
                    className="border-2" 
                    required 
                />
                <label>Quantity</label>
                <input
                    type="number" 
                    placeholder="Qty"
                    value={quantity}
                    min="1"
                    onChange={((e) => setQuantity(e.target.value))}
                    className="border-2" 
                    required
                />
                <button type="submit">Add Thread</button>
            </form>
        </div>
    );
}

export default AddThreadForm;
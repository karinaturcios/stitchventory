import { useState } from "react";

const AddThreadForm = ({onAddThread, masterThreadData, mode = "single", onClose }) => {
    const [dmcCode, setDmcCode] = useState(""); // State for DMC code input
    const [quantity, setQuantity] = useState(1); // State for quantity input
    const [bulkInput, setBulkInput] = useState(""); // State for bulk input in multi-add mode

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (mode === "multi") {
            const lines = bulkInput.split("\n").map(line => line.trim()).filter(Boolean);
            // console.log("Parsed lines:", lines);
            const newThreads = [];

            for (const line of lines) {
                const [code, qtyStr] = line.split(",").map(str => str.trim());
                const quantity = parseInt(qtyStr, 10);
                const match = masterThreadData.find(thread => thread.dmcCode === code);

                if (match && !isNaN(quantity)) {
                    newThreads.push({ ...match, quantity });
                } else {
                    alert(`Invalid entry or DMC code not found ${line}`);
                    return;
                }
            }
            console.log("New threads array:", newThreads);

            onAddThread(newThreads); // Calls the onAddThread function to add the new threads to the inventory
            setBulkInput(""); // Reset bulk input
        } else {
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
        }
        onClose(); // Close the form after submission
    };

    return (
        <div className="bg-pink-500 p-5 rounded shadow-md">
            {mode === "multi" ? (
                <div>
                    <h2>Multi-Add Threads</h2>
                    <textarea
                        value={bulkInput}
                        onChange={(e) => setBulkInput(e.target.value)}
                        placeholder="Enter DMC codes and quantities, one per line (e.g., 310, 5)"
                        className="border-2 w-full h-32"
                    />
                    <button onClick={handleSubmit}>Add Threads</button>
                </div>
            ) : (
                <div>
                    <h2>Add New Thread</h2>
                    <form onSubmit={handleSubmit}>
                        <label>DMC Code</label>
                        <input 
                            type="text" 
                            placeholder="DMC Code"
                            value={dmcCode}
                            onChange={(e) => setDmcCode(e.target.value)}
                            className="border-2" 
                            required 
                        />
                        <label>Quantity</label>
                        <input
                            type="number" 
                            placeholder="Qty"
                            value={quantity}
                            min="1"
                            onChange={(e) => setQuantity(e.target.value)}
                            className="border-2" 
                            required
                        />
                        <button type="submit">Add to Inventory</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AddThreadForm;
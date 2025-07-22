import { useState } from "react";

const AddThreadForm = ({onAddThread, masterThreadData }) => {
    const [multiRows, setMultiRows] = useState([
        {dmcCode: '', quantity: 1 }
    ]);

    const handleRowChange = (index, field, value) => {
        setMultiRows(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: value
            };
            return updated;
        }); // Keeps the rows that were filled when adding a new row
    };

    const handleRowKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setMultiRows(prevRows => {
                const currentRow = prevRows[index];
                if (!currentRow.dmcCode.trim() || !currentRow.quantity) return prevRows;

                return [
                    ...prevRows,
                    { dmcCode: '', quantity: 1 }
                ];
            });
        }
    };

    const removeRow = (index) => {
        setMultiRows(prev => prev.filter((_, i) => i !== index));
    } // removes rows for multi-add before uploading to the inventory

    const handleMultiSubmit = () => {
        const newThreads = [];

        for (const { dmcCode, quantity } of multiRows) {
            const trimmedCode = dmcCode.trim();
            const parsedQty = parseInt(quantity, 10);
            const match = masterThreadData.find(thread => thread.dmcCode === trimmedCode);

            if (match && !isNaN(parsedQty) && parsedQty > 0) {
                newThreads.push({...match, quantity: parsedQty });
            } else {
                alert(`Invalid or missing data for: ${trimmedCode}`);
                return;
            }
        }

        onAddThread(newThreads);
        setMultiRows([{ dmcCode: '', quantity: 1}]);
    }; //handles the multi-add submission

    const addNewRow = () => {
        setMultiRows(prev => [...prev, { dmcCode: '', quantity: 1}]);
    }


    return (
        <div className="bg-pink-500 p-5 rounded shadow-md">
            <h2>Add Threads</h2>
            <p>To add multiple threads as you go, hit the enter key.</p>
            <button className="bg-gray-400" onClick={addNewRow}>Add Row</button>
            <div>
                <label className="mx-2 text-start">DMC Code</label>
                <label className="mx-2">Quantity</label>
                    {multiRows.map((row, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                            type="text"
                            placeholder="DMC Code"
                            value={row.dmcCode}
                            onChange={(e) => handleRowChange(index, 'dmcCode', e.target.value.toLowerCase())}
                            onKeyDown={(e) => handleRowKeyDown(e, index)}
                            className="border-2 px-2 py-1 w-1/2"
                            required
                            />
                            <input
                            type="number"
                            placeholder="Qty"
                            value={row.quantity}
                            min="1"
                            onChange={(e) => handleRowChange(index, 'quantity', e.target.value)}
                            onKeyDown={(e) => handleRowKeyDown(e, index)}
                            className="border-2 px-2 py-1 w-1/4"
                            required
                            />
                            {multiRows.length > 1 && (
                                <button
                                type="button"
                                onClick={() => removeRow(index)}
                                className="bg-red-300 px-2 rounded"
                                >
                                    X
                                </button>
                            )}
                        </div>
                    ))}
                    <button className="bg-gray-400" onClick={handleMultiSubmit}>Add to Inventory</button>
            </div>
        </div>
    );
};

export default AddThreadForm;
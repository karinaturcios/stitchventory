import { useState } from 'react';

const AddProjectPageTwo = ({colorCount, onSubmit}) => {
    const initialRows = Array.from({ length: colorCount}, () => ({
        dmcCode: '',
        quantity: ''
    }));
    const [rows, setRows] = useState(initialRows);

    const handleRowChange = (index, field, value) => {
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleaned = rows.map((row) => ({
            dmcCode: row.dmcCode.trim(),
            quantity: row.quantity ? parseInt(row.quantity) : 1,
        }));
        onSubmit(cleaned);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Add Key Table</h2>
                <p>Enter the DMC code and quantity for each color on your key. If no quantity is stated, assume 1 skein.</p>

                <table>
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">DMC Code</th>
                            <th className="text-center">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <input
                                    className="input bg-white border border-gray-300 rounded-md text-gray-900"
                                    type="text"
                                    value={row.dmcCode}
                                    onChange={(e) => handleRowChange(index, 'dmcCode', e.target.value)}/>
                                </td>
                                <td>
                                    <input
                                    className="input bg-white border border-gray-300 rounded-md text-gray-900"
                                    type="number"
                                    min="1"
                                    value={row.quantity}
                                    onChange={(e) => handleRowChange(index, 'quantity', e.target.value)}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                type="submit"
                className="btn btn-primary mt-6">
                    Submit Project
                </button>
            </form>
        </div>
    )
};

export default AddProjectPageTwo;
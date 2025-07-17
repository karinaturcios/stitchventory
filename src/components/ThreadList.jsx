import '../styles/threadlist.css';

const ThreadList = ({ threads, threadCount, onThreadSelect, onDeleteThread, totalColors}) => {

    return (
        <div>
            <p>You have {threadCount} out of {totalColors} colors. Way to go!</p>
            <table className="table-auto border-collapse w-full text-left">
                <thead className="bg-purple-300">
                    <tr>
                        <th className="px-4 py-2">DMC Code</th>
                        <th className="px-4 py-2">Swatch</th>
                        <th className="px-4 py-2">Color Name</th>
                        <th className="px-4 py-2">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {threads.map((thread) => (
                        <tr key={thread.dmcCode} 
                            className="hover:bg-pink-100 cursor-pointer group"
                            onClick={() => onThreadSelect(thread)}
                            >
                            <td className="px-4 py-2">{thread.dmcCode}</td>
                            <td className="px-4 py-2">
                                <div
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        backgroundColor: thread.hex,
                                        border: "1px solid #000"
                                    }}
                                ></div>
                            </td>
                            <td className="px-4 py-2">{thread.colorName}</td>
                            <td className="px-4 py-2">{thread.quantity}
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent row click event
                                        onDeleteThread(thread.dmcCode);
                                    }}
                                >X
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ThreadList;
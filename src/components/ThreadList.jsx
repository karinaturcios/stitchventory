import '../styles/threadlist.css';

const ThreadList = ({ threads, threadCount, onThreadSelect}) => {
    console.log("onThreadSelect:", onThreadSelect);

    return (
        <div>
            <p>You have {threadCount} out of 500 colors. Way to go!</p>
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
                            className="hover:bg-pink-100 cursor-pointer"
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
                            <td className="px-4 py-2">{thread.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ThreadList;
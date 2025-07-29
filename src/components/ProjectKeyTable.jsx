import flossList from '../data/flossList.json';

const ProjectKeyTable = ({ keyTableData }) => {

    const getColorSwatch = (dmcCode) => {
        const simplifiedFlossList = Object.values(flossList).map(thread => ({
            dmcCode: thread.number,
            hex: thread.hex
        })); // Simplifies raw data and changes the field from 'number' to 'dmcCode'

        const match = simplifiedFlossList.find(thread => thread.dmcCode === dmcCode); // Matches the code from the key to the floss data
        return match ? `#${match.hex}` : '#ffffff'; // If a match is found, return the hex color, otherwise return white
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>DMC Code</th>
                        <th>Swatch</th>
                        <th>Quantity Needed</th>
                        <th>Quantity Owned</th>
                    </tr>
                </thead>
                <tbody>
                    {keyTableData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.dmcCode}</td>
                            <td>
                                <div
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        backgroundColor: getColorSwatch(item.dmcCode),
                                        border: "1px solid #000"
                                    }}
                                ></div>
                            </td>
                            <td>{item.quantity}</td>
                            <td>0</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectKeyTable;
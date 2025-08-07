import flossList from '../data/flossList.json';
import { useSelector } from 'react-redux';
import { selectQuantityByCode } from '../redux/threadsSlice';

const ProjectKeyTable = ({ keyTableData }) => {
    console.log('Key Table Data:', keyTableData); // Debugging log


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
                        <th className="px-3">DMC Code</th>
                        <th className="px-3">Swatch</th>
                        <th className="px-3">Quantity Needed</th>
                        <th className="px-3">Quantity Owned</th>
                    </tr>
                </thead>
                <tbody>
                    {keyTableData.map((item, index) => {
                        const quantityOwned = useSelector(state => selectQuantityByCode(state, item.dmcCode));
                        return (
                        <tr key={index}>
                            <td>{item.dmcCode}</td>
                            <td>
                                <div
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        backgroundColor: getColorSwatch(item.dmcCode),
                                        border: "1px solid #000",
                                    }}
                                ></div>
                            </td>
                            <td>{item.quantity}</td>
                            <td>{quantityOwned}</td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectKeyTable;
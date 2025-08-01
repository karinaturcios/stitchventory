import { useState } from 'react';

const AddProjectPageOne = ({ onNext }) => {
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [colorCount, setColorCount] = useState(0);
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnail(reader.result); // Set the thumbnail to the file's data URL
        }

        if (file) {
            reader.readAsDataURL(file); // Read the file as a data URL
        }
        console.log("Image file selected:", file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({
            title,
            thumbnail: imageFile,
            colorCount: parseInt(colorCount)
        });
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 class="text-lg font-bold mb-4">Add New Project</h2>

                <label className="mx-2">Project Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md text-gray-900"
                    required
                />

                <label className="mt-4 block">Thumbnail URL</label>
                <input
                    className="text-sm text-gray-900 border border-gray-300 rounded-md hover:file:cursor-pointer bg-white file:bg-pink-200 hover:file:bg-pink-300"
                    type="file"
                    accept="image/*"
                    value={thumbnail}
                    onChange={handleImageChange}
                />

                <label className="mt-4 block">Number of Colors</label>
                <input
                    className="input bg-white border border-gray-300 rounded-md text-gray-900"
                    type="number"
                    min="1"
                    value={colorCount}
                    onChange={(e) => setColorCount(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="btn btn-primary mt-4">
                        Next
                </button>
            </form>
        </div>
    );
};

export default AddProjectPageOne;
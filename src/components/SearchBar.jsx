const SearchBar = ({ value, onChange }) => {
    return(
        <input
        type="search"
        className="border-2 w-full p-2 mb-4"
        placeholder="Search for Threads..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        />
    )
};

export default SearchBar;
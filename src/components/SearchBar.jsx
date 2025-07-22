const SearchBar = ({ searchTerm, setSearchTerm }) => {

    return(
        <input
        type="search"
        className="border-2 w-full p-2 mb-4"
        placeholder="Search for Threads..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
    )
};

export default SearchBar;
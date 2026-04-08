const SearchBar = ({ filterPrice, setFilterPrice }) => {
  return (
    <div className="filter-bar">
      <h2>Product List</h2>
      <label>
        Min Price Filter: 
        <input 
          type="number" 
          min="0" 
          value={filterPrice} 
          onChange={(e) => setFilterPrice(Number(e.target.value))} 
          className="filter-input"
        />
      </label>
    </div>
  );
};

export default SearchBar;

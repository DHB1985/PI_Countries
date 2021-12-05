import React from "react";

const SearchBar = ({ setCurrentPage, setFilterState, filterState }) => {
  const handleInputChange = (event) => {
    event.preventDefault();
    setFilterState({ ...filterState, countrySearch: event.target.value });
    setCurrentPage(1);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar País..."
        onChange={(event) => handleInputChange(event)}
      />
    </div>
  );
};

export default SearchBar;

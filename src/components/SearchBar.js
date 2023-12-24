 // src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
};

export default SearchBar;


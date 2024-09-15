import React from 'react';

function SearchBar({ onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search categories"
        onChange={onSearchChange}
      />
    </div>
  );
}

export default SearchBar;
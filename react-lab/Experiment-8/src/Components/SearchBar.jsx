import React from 'react'

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-section">
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  )
}

export default SearchBar
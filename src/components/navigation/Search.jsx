import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import './Search.css';

const Search = () => {
  return (
    <div className="search-bar-container">
      <SearchIcon className="search-icon" />
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search anything..." 
      />
    </div>
  );
};

export default Search;

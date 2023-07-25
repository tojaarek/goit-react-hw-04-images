import searchBar from './SearchBar.module.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ searchValue }) => {
  const [inputValue, setInputValue] = useState('');
  const handleSearch = event => {
    event.preventDefault();
    searchValue({ searchValue: inputValue });
  };

  return (
    <header className={searchBar.header}>
      <form className={searchBar.form} onSubmit={handleSearch}>
        <button type="submit" className={searchBar.button}>
          <span className="button-label">Search</span>
        </button>

        <input
          name="searchInput"
          className={searchBar.input}
          type="text"
          autoComplete="off"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  searchValue: PropTypes.func.isRequired, // Oczekuje funkcji, wymagane
};

export default SearchBar;

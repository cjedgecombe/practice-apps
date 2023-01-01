import React, { useState } from 'react';

const SearchBar = (props) => {

  const [searchState, setSearchState] = useState('');

  const searchChangeHandler = (event) => {
    setSearchState(event.target.value);
  }


  return (
    <div>
      <input type="text" id="search" placeholder="Search for an Entry" onChange={searchChangeHandler}></input>
      <button onClick={() => {props.searchHandler(searchState)}}>Search</button>
    </div>
  )
}

export default SearchBar;
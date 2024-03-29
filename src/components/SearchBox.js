import React from "react";

const SearchBox = ({ searchChange }) => {
  return (
    <div className="pa2">
      <input
        aria-label="Search Robots"
        className="pa3 ba b--green bg-lightest-blue"
        type="search"
        onChange={searchChange}
        placeholder="search robots"
      />
    </div>
  );
};

export default SearchBox;

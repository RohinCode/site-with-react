import { useState } from "react";

function SearchProduct({ getReady, setSearchValue }) {
  return (
    <div className="searchBox">
      <input
        type="text"
        placeholder="جست‌وجو..."
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />
      <button onClick={getReady}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
}

export default SearchProduct;

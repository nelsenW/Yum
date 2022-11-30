import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({
  placeholder,
  data,
  handleSelectedEvent,
  handleFilterEvents,
}) {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleFilter = (e) => {
    setInputValue(e.target.value);
    const searchWord = e.target.value;
    const newFilter = data.filter((event) =>
      event.title.toLowerCase().includes(searchWord.toLowerCase())
    );
    handleFilterEvents(newFilter);

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = (e) => {
    setFilteredData([]);
    setInputValue("");
    handleFilterEvents([]);
  };

  const handleResultClick = (e, event) => {
    handleSelectedEvent(event);
    setSelectedResult(event);
    setInputValue(event.title);
    setFilteredData([]);
  };

  return (
    <div className="search-bar">
      <div className="search-inputs">
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleFilter}
          value={inputValue}
        />
        <div className="search-icon">
          {!inputValue.length > 0 ? (
            <i className="fa-solid fa-magnifying-glass"></i>
          ) : (
            <i
              className="fa-solid fa-xmark"
              id="clear-btn"
              onClick={clearInput}
            ></i>
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="data-result">
          {filteredData.slice(0, 7).map((event, key) => {
            return (
              <div
                onClick={(e) => handleResultClick(e, event)}
                className="data-item"
                href="#"
                key={key}
              >
                <p>{event.title}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

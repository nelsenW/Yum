import { useEffect, useRef, useState } from "react";
import useAddress from "./useAddress";

const AddressInput = ({ setLocationName, setCoordinates, type, name }) => {
  const address = useAddress("");
  const [showResultsDiv, setShowResultsDiv] = useState(false);
  const resultsRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const handleDocumentClick = (e) => {
    if (resultsRef && resultsRef.current) {
      const ref = resultsRef.current;
      if (!ref.contains(e.target)) {
        setShowResultsDiv(false);
      }
    }
  };

  const handleResultClick = (searchResult) => {
    setCoordinates([searchResult.center[1], searchResult.center[0]]);
    setLocationName(searchResult.place_name);
    address.setInputValue(searchResult.place_name);
    address.setSearchResults([]);
  };

  // async function showPosition(position) {
  //   setCoordinates([position.coords.latitude, position.coords.longitude]);
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;

  //   try {
  //     const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}&autocomplete=true`;
  //     const response = await fetch(endpoint);
  //     const results = await response.json();
  //     setLocationName(results.features[0].place_name);
  //     address.setInputValue(results.features[0].place_name);
  //   } catch (err) {
  //     console.log("Error", err);
  //   }
  // }

  return (
    <>
      <div className="location-container">
        <label>
          <span>Location</span>
          <input
            value={type === "edit" ? name : address.inputValue}
            onChange={(e) => {
              address.handleChange(e);
              setLocationName(e.target.value);
              setShowResultsDiv(true);
            }}
          />
        </label>

        {address.searchResults.length > 0 && showResultsDiv ? (
          <div className="location-results" ref={resultsRef}>
            {address.searchResults.map((searchResult) => {
              return (
                <div
                  className="result-items"
                  onClick={() => handleResultClick(searchResult)}
                  key={searchResult.id}
                >
                  {searchResult.place_name}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default AddressInput;

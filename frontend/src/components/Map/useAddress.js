import { useState } from "react";

const useAddress = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const handleChange = async (e) => {
    setInputValue(e.target.value);

    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=${accessToken}&autocomplete=true`;
      const response = await fetch(endpoint);
      const results = await response.json();

      setSearchResults(results.features);
    } catch (err) {
      console.log("Error", err);
    }
  };

  return {
    inputValue,
    setInputValue,
    handleChange,
    searchResults,
    setSearchResults,
  };
};

export default useAddress;

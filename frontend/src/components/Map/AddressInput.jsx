import useAddress from "./useAddress";

const AddressInput = ({setLocation}) => {
  const address = useAddress("");

  const handleResultClick = (searchResult) => {
    address.setInputValue(searchResult.place_name);
    address.setSearchResults([]);
  };

  const handleCurrentLocationClick = () => {
    navigator.geolocation.getCurrentPosition(showPosition);
  };

  function showPosition(position) {
    console.log(
      "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude
    );
  }

  return (
    <div>
      <input value={address.inputValue} 
      onChange={(e) => {
        address.handleChange(e)
        setLocation(e.target.value)
      }} 
      />
      {address.searchResults && (
        <div>
          {address.searchResults.map((searchResult) => {
            return (
              <div onClick={() => handleResultClick(searchResult)}>
                {searchResult.place_name}
              </div>
            );
          })}
        </div>
      )}
      <button onClick={handleCurrentLocationClick}>Use Current Location</button>
    </div>
  );
};

export default AddressInput;

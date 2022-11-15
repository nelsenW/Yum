import useAddress from "./useAddress";

const AddressInput = () => {
  const address = useAddress("");

  const handleResultClick = (searchResult) => {
    address.setInputValue(searchResult.place_name);
    address.setSearchResults([]);
  };

  return (
    <div>
      <input value={address.inputValue} onChange={address.handleChange} />
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
    </div>
  );
};

export default AddressInput;

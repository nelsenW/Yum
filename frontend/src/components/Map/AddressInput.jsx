import useAddress from './useAddress';

const AddressInput = ({ setLocationName, setCoordinates }) => {
	const address = useAddress('');
	const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

	const handleResultClick = (searchResult) => {
		setCoordinates([searchResult.center[1], searchResult.center[0]]);
		setLocationName(searchResult.place_name);
		address.setInputValue(searchResult.place_name);
		address.setSearchResults([]);
	};

	const handleCurrentLocationClick = () => {
		navigator.geolocation.getCurrentPosition(showPosition);
	};

	async function showPosition(position) {
		setCoordinates(position.coords.latitude, position.coords.longitude);
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;

		try {
			const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}&autocomplete=true`;
			const response = await fetch(endpoint);
			const results = await response.json();
			setLocationName(results.features[0].place_name);
		} catch (err) {
			console.log('Error', err);
		}
	}

	return (
		<div>
			<input
				value={address.inputValue}
				onChange={(e) => {
					address.handleChange(e);
					setLocationName(e.target.value);
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
			<button type='button' onClick={handleCurrentLocationClick}>
				Use Current Location
			</button>
		</div>
	);
};

export default AddressInput;

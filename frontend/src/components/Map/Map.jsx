import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import { ImLocation2 } from 'react-icons/im';
import AddressInput from './AddressInput';

const Map = () => {
	const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

	// const coordinates = events.map((event) => ({
	//   longitude: event.location.coordinates[0],
	//   latitude: event.location.coordinates[1],
	// }));

	// const center = getCenter(coordinates);

	const [viewport, setViewport] = useState({
		height: '100%',
		width: '100%',
		latitude: 37.79883671373941, //center.latitude
		longitude: -122.40120608513877, //center.longitude
		zoom: 11
	});
	const [selectedLocation, setSelectedLocation] = useState([]);

	const handleCurrentLocationClick = () => {
		navigator.geolocation.getCurrentPosition(showPosition);
	};

	function showPosition(position) {
		console.log(
			'Latitude: ' +
				position.coords.latitude +
				'<br>Longitude: ' +
				position.coords.longitude
		);
	}

	return (
		<>
			<ReactMapGL
				mapStyle='mapbox://styles/yanrivera/clahgf6ld000514s1h2zr5buk'
				mapboxAccessToken={accessToken}
				{...viewport}
				onMove={(evt) => setViewport(evt.viewport)}>
				{/* {events.map((event) => (
          <div key={event.location.coordinates[0]}>
            <Marker
              longitude={event.location.coordinates[0]}
              latitude={event.location.coordinates[1]}
            >
              <span
                onClick={() => setSelectedLocation(event.location.coordinates)}
              >
                <ImLocation2 size={12} />
              </span>
            </Marker>
            {selectedLocation[0] === event.location.coordinates[0] ? (
              <Popup
                onClose={() => setSelectedLocation([])}
                closeOnClick={true}
                latitude={event.location.coordinates[0]}
                longitude={event.location.coordinates[1]}
              >
                {event.title}
              </Popup>
            ) : null}
          </div>
        ))} */}
			</ReactMapGL>
			<button onClick={handleCurrentLocationClick}>Use Current Location</button>
			<AddressInput />
		</>
	);
};

export default Map;

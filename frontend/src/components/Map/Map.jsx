import { useEffect, useState } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { ImLocation2 } from "react-icons/im";
import jwtFetch from "../../store/jwt";
import "./map.css";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ({ selectedEvent, handleSelectedEvent }) => {
  const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const [events, setEvents] = useState([]);
  const [currentUserLocation, setCurrentUserLocation] = useState();
  const [viewport, setViewport] = useState({});
  const [selectedLocation, setSelectedLocation] = useState([]);

  useEffect(() => {
    fetchEvents().then((data) => {
      setEvents(data);
    });
    // console.log(selectedEvent);

    handleCurrentUserLocation();
  }, [selectedEvent]);

  const fetchEvents = async () => {
    const res = await jwtFetch("/api/events");

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  };

  const handleCurrentUserLocation = () => {
    navigator.geolocation.getCurrentPosition(showPosition);
  };

  function showPosition(position) {
    if (selectedEvent) {
      setViewport({
        longitude: selectedEvent.location.coordinates[1],
        latitude: selectedEvent.location.coordinates[0],
        zoom: 11,
      });
    } else {
      setCurrentUserLocation({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    }
  }

  return (
    <>
      <div className="current-location-btn-div">
        <button
          onClick={() =>
            setViewport({
              longitude: currentUserLocation.longitude,
              latitude: currentUserLocation.latitude,
              zoom: 11,
            })
          }
          className="current-loc-btn"
        >
          Current Location
        </button>
      </div>
      {currentUserLocation && (
        <ReactMapGL
          mapStyle="mapbox://styles/yanrivera/clahdm8n2000214uiam8fx9ke"
          mapboxAccessToken={accessToken}
          initialViewState={{
            longitude: currentUserLocation.longitude,
            latitude: currentUserLocation.latitude,
            zoom: 11,
          }}
          {...viewport}
          onMove={(evt) => setViewport(evt.viewport)}
        >
          {events &&
            events.map((event) => (
              <>
                <Marker
                  latitude={event.location.coordinates[0]}
                  longitude={event.location.coordinates[1]}
                >
                  <p
                    onClick={() =>
                      setSelectedLocation(event.location.coordinates)
                    }
                  >
                    <ImLocation2 size={30} className="map-marker-icon" />
                  </p>
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
              </>
            ))}
          <NavigationControl position="bottom-right" />
          <GeolocateControl position="bottom-right" trackerUseLocation />
        </ReactMapGL>
      )}
    </>
  );
};

export default Map;

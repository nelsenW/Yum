import { useEffect, useState } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { ImLocation2 } from "react-icons/im";
import jwtFetch from "./store/jwt";
import "./map.css";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const [events, setEvents] = useState([]);
  const [currentUserLocation, setCurrentUserLocation] = useState();
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 11,
  });
  const [selectedLocation, setSelectedLocation] = useState([]);

  useEffect(() => {
    fetchEvents().then((data) => {
      setEvents(data);
    });

    handleCurrentUserLocation();
  }, []);

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
    setCurrentUserLocation({
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    });
  }

  return (
    <>
      {currentUserLocation && (
        <ReactMapGL
          mapStyle="mapbox://styles/yanrivera/clahdm8n2000214uiam8fx9ke"
          mapboxAccessToken={accessToken}
          initialViewState={{
            longitude: currentUserLocation.longitude,
            latitude: currentUserLocation.latitude,
            zoom: 11,
          }}
          // onMove={(e) => {
          //   setViewport((prevState) => ({
          //     ...viewport,
          //     longitude: e.viewState.longitude,
          //     latitude: e.viewState.latitude,
          //   }));
          // }}
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
                    style={{ color: "yellow" }}
                  >
                    <ImLocation2 size={25} />
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
          <GeolocateControl
            position="top-left"
            trackerUseLocation
            // onGeolocate={(e) =>
            //   setViewport((prevState) => ({
            //     ...prevState,
            //     longitude: e.coords.longitude,
            //     latitude: e.coords.latitude,
            //   }))
            // }
          />
        </ReactMapGL>
      )}
    </>
  );
};

export default Map;

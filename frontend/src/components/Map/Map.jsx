import { useEffect, useState } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import mapboxgl from "mapbox-gl";
import getCenter from "geolib/es/getCenter";
import { ImLocation2 } from "react-icons/im";
import jwtFetch from "../../store/jwt";
import "./map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import EventModal from "../Events/EventModal";
import { Modal } from "../../context/Modal";
// prettier-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Map = ({ selectedEvent, handleSelectedEvent }) => {
  const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const [events, setEvents] = useState([]);
  const [currentUserLocation, setCurrentUserLocation] = useState();
  const [viewport, setViewport] = useState({});
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [eventModal, setEventModal] = useState(false);
  const [clickedPin, setClickedPin] = useState(null);

  useEffect(() => {
    fetchEvents().then((data) => {
      setEvents(data);
    });

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
        zoom: 12,
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
              zoom: 12,
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
            zoom: 12,
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
                    onClick={() => {
                      setSelectedLocation(event.location.coordinates);
                      setClickedPin(event);
                      setEventModal(true);
                    }}
                  >
                    <ImLocation2 size={30} className="map-marker-icon" />
                  </p>
                </Marker>
              </>
            ))}
          <NavigationControl position="bottom-right" />
          <GeolocateControl position="bottom-right" trackerUseLocation />
        </ReactMapGL>
      )}
      {eventModal && (
        <Modal
          onClose={() => {
            setEventModal(false);
          }}
        >
          <EventModal setEventModal={setEventModal} event={clickedPin} />
        </Modal>
      )}
    </>
  );
};

export default Map;

import Map from "./Map";

const MapContainer = ({
  selectedEvent,
  handleSelectedEvent,
  filteredEvents,
}) => {
  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
      }}
    >
      <Map
        selectedEvent={selectedEvent}
        handleSelectedEvent={handleSelectedEvent}
      />
    </div>
  );
};

export default MapContainer;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Modal } from "../../context/Modal";
import MapContainer from "../Map/MapContainer";
import SearchBar from "../SearchBar/SearchBar";
import { fetchEvents } from "../../store/events";
import EventForm from "../UserPage/TabFiles/EventForm";
import UserPage from "../UserPage/UserPage";
import "./mainPage.css";
import SideNav from "./SideNav";

export default function MainPage() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state?.events);
  const eventChange = useSelector((state) => state?.events.new);
  const [sideBar, setSideBar] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [selectedEvent, setSetectedEvent] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [eventChange, userModal]);

  const hidden = () => {
    return sideBar ? " hidden" : "";
  };

  const handleSelectedEvent = (event) => {
    setSetectedEvent(event);
  };

  const handleFilterEvents = (events) => {
    setFilteredEvents(events);
  };

  return (
    <div id="main-page">
      {!userModal && (
        <div className="search-bar-cont">
          <SearchBar
            placeholder="Search for an event"
            data={events?.all}
            handleSelectedEvent={handleSelectedEvent}
            handleFilterEvents={handleFilterEvents}
          />
            <button onClick={() => setUserModal(true)} id="make-event">
          +
           </button>
          
        </div>
      )}
      <div onClick={() => setSideBar(!sideBar)} id="hamburger-wrapper">
        <div className={`hamburger${hidden()}`}></div>
        <div className={`hamburger${hidden()}`}></div>
        <div className={`hamburger${hidden()}`}></div>
      </div>
      <SideNav hidden={hidden} filteredEvents={filteredEvents} />
      <MapContainer
        selectedEvent={selectedEvent}
        handleSelectedEvent={handleSelectedEvent}
      />
      
      {userModal ? (
        <Modal onClose={() => setUserModal(false)}>
          <UserPage
            setUserModal={setUserModal}
            inputTab={<EventForm setUserModal={setUserModal} />}
          />
        </Modal>
      ) : null}
    </div>
  );
}

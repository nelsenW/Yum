import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { fetchEvents } from "../../store/events";
import { logout } from "../../store/session";
import EventBubble from "../Events/EventBubble";
import UserPage from "../UserPage/UserPage";
import "./sideNav.css";

export default function SideNav({
  hidden,
  filteredEvents,
  handleSelectedEvent,
}) {
  const userName = useSelector((state) => state.session.user.username);
  const dispatch = useDispatch();
  const [userModal, setUserModal] = useState(false);
  const [inputTab, setInputTab] = useState("")
  const newEvents = useSelector((state) => state.events.new);
  let events = useSelector((state) =>
    state.events.all ? Object.values(state.events.all) : []
  );
  let listedEvents = filteredEvents.length === 0 ? events : filteredEvents;

  useEffect(() => {
    dispatch(fetchEvents());
  }, [filteredEvents, newEvents]);

  return (
    <nav
      id="nav-sidebar"
      className={`${hidden() === " hidden" ? " hidden2" : ""}`}
    >
      <div id="nav-sidebar-main">
        {listedEvents?.map((event) => {
          return (
            <div onClick={(e) => handleSelectedEvent(event)}>
              <EventBubble event={event} key={event.id} setUserModal={setUserModal} setInputTab={setInputTab}/>
            </div>
          );
        })}
      </div>
      <div className="sidebar-profile-token">
        <h1>{userName}</h1>
        <div>
          <button
            className="settings-button"
            onClick={() => {
              setInputTab(null)
              setUserModal(true)}
            }
          >
            <i className="fa-regular fa-user"></i>
          </button>
          <button
            className="settings-button"
            onClick={() => dispatch(logout())}
          >
            <svg role="img" width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18 2H7C5.897 2 5 2.898 5 4V11H12.59L10.293 8.708L11.706 7.292L16.414 11.991L11.708 16.706L10.292 15.294L12.582 13H5V20C5 21.103 5.897 22 7 22H18C19.103 22 20 21.103 20 20V4C20 2.898 19.103 2 18 2Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {userModal ? (
        <Modal onClose={() => setUserModal(false)}>
          <UserPage setUserModal={setUserModal} inputTab={inputTab}/>
        </Modal>
      ) : null}
    </nav>
  );
}

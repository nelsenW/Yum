import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { fetchEvents } from "../../store/events";
import { logout } from "../../store/session";
import EventBubble from "../Events/EventBubble";
import UserPage from "../UserPage/UserPage";
import "./sideNav.css";

export default function SideNav({ hidden, filteredEvents }) {
  const userName = useSelector((state) => state.session.user.username);
  const dispatch = useDispatch();
  const [userModal, setUserModal] = useState();
  const newEvents = useSelector((state) => state.events.new);
  let events = useSelector((state) =>
    state.events.all ? Object.values(state.events.all) : []
  );
  let listedEvents = filteredEvents.length === 0 ? events : filteredEvents;

  useEffect(() => {
    dispatch(fetchEvents());
  }, [filteredEvents]);

  useEffect(() => {}, [newEvents]);

  console.log(events);
  console.log(filteredEvents);

  return (
    <nav
      id="nav-sidebar"
      className={`${hidden() === " hidden" ? " hidden2" : ""}`}
    >
      <div id="nav-sidebar-main">
        {listedEvents?.map((event) => {
          return <EventBubble event={event} />;
        })}
      </div>
      <div className="sidebar-profile-token">
        <h1>{userName}</h1>
        <div>
          <button
            className="settings-button"
            onClick={() => setUserModal(true)}
          >
            <svg
              aria-hidden="true"
              role="img"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
              ></path>
            </svg>
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
      {userModal && (
        <Modal onClose={() => setUserModal(false)}>
          <UserPage setUserModal={setUserModal} />
        </Modal>
      )}
    </nav>
  );
}

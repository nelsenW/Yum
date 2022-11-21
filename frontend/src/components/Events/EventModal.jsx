import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../../store/events";
import "./eventModal.css";

export default function EventModal({ setEventModal, event }) {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user._id);

  const handleClick = () => {
    let newGuestList = event?.guestLists;
    for (let i = 0; i < count; i++) {
      newGuestList = newGuestList.concat(userId);
    }
    event.guestLists = newGuestList;
    dispatch(updateEvent({ event }));
    setEventModal(false);
  };

  return (
    <div id="event-modal">
      <div
        id="esc-toolbar"
        onClick={() => {
          setEventModal(false);
        }}
      >
        <div id="esc-button">
          <svg role="img" width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
            ></path>
          </svg>
        </div>
        <h2>ESC</h2>
      </div>

      <div className="event-modal-image-group">
        {event?.images?.map((image) => (
          <img src={image} key={image} className="event-modal-image"></img>
        ))}
      </div>
      <div className="event-modal-main">
        <h1>{event?.title}</h1>
        <p id="event-modal-desc">Description: {event?.description}</p>
        <p id="event-modal-price">${event?.price}</p>
        <p id="event-modal-type">Event-Type: {event?.eventType}</p>
        <p id="event-modal-host">Hosted by: {event?.host.username}</p>
        <p id="event-modal-guests">
          Available spots: [ {event?.guestLists?.length}/{event?.guestNumber} ]
        </p>
        <label>
          <span id="event-num-meals">Number of meals:</span>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            min={0}
            max={event?.guestNumber - event?.guestLists.length}
          ></input>
        </label>
        <button onClick={handleClick} className="settings-button">
          Join the group!
        </button>
      </div>
    </div>
  );
}

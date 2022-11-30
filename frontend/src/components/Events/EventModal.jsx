import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { updateEvent } from "../../store/events";
import UserModal from "../UserPage/UserModal";
import "./eventModal.css";

export default function EventModal({ setEventModal, event }) {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user._id);
  const [eventDate, setEventDate] = useState();
  const [userModal, setUserModal] = useState()
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setEventDate(formatDate);
  }, []);

  const handleClick = () => {
    let newGuestList = event?.guestLists;
    for (let i = 0; i < count; i++) {
      newGuestList = newGuestList.concat(userId);
    }
    event.guestLists = newGuestList;
    dispatch(updateEvent({ event }));
    setEventModal(false);
  };

  const formatDate = () => {
    const year = event?.date.slice(0, 4);
    const month = event?.date.slice(5, 7);
    const day = event?.date.slice(8, 10);
    const hour = Number(event?.date.slice(11, 13));
    const formattedHour = `${hour > 12 ? hour - 12 : hour}`;
    const time = `${formattedHour}:${event?.date.slice(14, 16)} ${
      hour > 11 ? "PM" : "AM"
    }`;

    return `${day}/${month}/${year} at ${time}`;
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div id="event-modal">
      <div
        className="event-card-inner"
        style={{
          transform: `${isFlipped ? "rotateY(180deg)" : ""}`,
        }}
      >
        <div className="event-modal-main front">
          <div className="h1-container">
            <h1>{event?.title}</h1>
          </div>
          <div className="event-modal-image-group">
            {event?.images?.map((image) => (
              <img src={image} key={image} className="event-modal-image" alt=""></img>
            ))}
          </div>
          <button className="settings-button card" onClick={flipCard}>
            Click here for details
          </button>
        </div>

        <div className="event-modal-main back">
          <button className="settings-button back" onClick={flipCard}>
            Go Back
          </button>
          <div className="event-details-container">
            <div>
              <p id="event-modal-desc">
                <span>
                  <span className="event-details-label">Description</span>:{" "}
                </span>
                {event?.description}
              </p>
              <p id="event-modal-location">
                <span>
                  <span className="event-details-label">Location</span>:{" "}
                </span>
                {event?.location.name}
              </p>
              <p id="event-modal-date">
                <span>
                  <span className="event-details-label">Date</span>:{" "}
                </span>
                {eventDate}
              </p>
              <p id="event-modal-price">
                <span>
                  <span className="event-details-label">Price</span>:{" "}
                </span>
                ${event?.price}
              </p>
              <p id="event-modal-type">
                <span>
                  <span className="event-details-label">Event-Type</span>:{" "}
                </span>
                {event?.eventType}
              </p>
              <p id="event-modal-host" onClick={() => setUserModal(true)}>
                <span>
                  <span className="event-details-label">Hosted by</span>:{" "}<button id="host-button">{event?.host.username}</button>
                </span>
              </p>
              <p id="event-modal-guests">
                <span>
                  <span className="event-details-label">Available spots</span>:{" "}
                </span>
                [ {event?.guestLists?.length}/{event?.guestNumber} ]
              </p>
              <label>
                <span>
                  <span id="event-num-meals">Number of meals</span>:{" "}
                </span>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  min={1}
                  max={event?.guestNumber - event?.guestLists.length}
                ></input>
              </label>
              <div className="attend-btn-container">
                <button
                  onClick={handleClick}
                  className="settings-button attend"
                >
                  Click here to attend event!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {userModal && (
				<Modal
					onClose={() => {
						setUserModal(false);
					}}>
					<UserModal setUserModal={setUserModal} userId={event?.host._id} />
				</Modal>
			)}
    </div>
  );
}

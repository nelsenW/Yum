import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserToEvent } from "../../store/events";
import "./eventModal.css";

export default function EventModal({ setEventModal, event }) {
    const [count, setCount] = useState();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user._id)

    const handleClick = () =>{
        let newGuestList = event.guestList 
        for(let i = 0; i < count; i++){
            newGuestList.concat(userId)
        }
      dispatch(addUserToEvent({guestList: newGuestList, eventId: event.id}));
      setEventModal(false);
    }

  return (
    <div>
      <div id="esc-toolbar" onClick={() => setEventModal(false)}>
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
      <h1>{event.title}</h1>
        <div className='event-modal-image-group'>
            {event?.images?.map(image => <img src={image} className='event-modal-image'></img>)}    
        </div>
      <p id='event-modal-desc'>{event.description}</p>
      <p id='event-modal-price'>{event.price}</p>
      <p id='event-modal-type'>{event.eventType}</p>
      <p id='event-modal-host'>Hosted by: {event.host.username}</p>
      <p id='event-modal-guests'>
        {event.guestList.length}/{event.guests}
      </p>
      <label>Number of meals
      <input type='number' value={count} onChange={(e) => setCount(e.target.value)} default={1}></input>
      </label>
      <button onClick={handleClick}>Join the group!</button>
    </div>
  );
}

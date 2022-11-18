import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EventCard from "../../Events/EventCard";
import "./eventForm.css";
import { clearSessionErrors } from "../../../store/session";
import { addUserToEvent, composeEvent } from "../../../store/events";
import AddressInput from "../../Map/AddressInput";
import UploadImages from "../../Events/UploadImages";

export default function EventForm({ event, type, setUserModal }) {
  const [locationName, setLocationName] = useState(event?.location.name ?? "");
  const [coordinates, setCoordinates] = useState(
    event?.location.coordinates ?? []
  );
  const [title, setTitle] = useState(event?.title ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [price, setPrice] = useState(event?.price ?? "");
  const [guestNumber, setGuestNumber] = useState(event?.guestNumber ?? 1);
  const [restrictions, setRestrictions] = useState(event?.restrictions ?? "");
  const errors = useSelector((state) => state.errors.session);
  const [eventType, setEventType] = useState(event?.eventType ?? "");
  const userId = useSelector((state) => state.session.user._id);
  const dispatch = useDispatch();
  const [imageUploadElement, setImageUploadElement] = useState(false);
  const [newEvent, setNewEvent] = useState(null);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const location = {
      type: "Point",
      name: locationName,
      coordinates: coordinates,
    };
    if (type === "edit") {
      debugger;
      dispatch(
        addUserToEvent({
          event: {
            _id: event._id,
            location: location,
            title,
            description,
            price,
            guestNumber,
            restrictions,
            eventType,
            host: userId,
          },
        })
      );
      setUserModal(false);
      return;
    }
    dispatch(
      composeEvent({
        location: location,
        title,
        description,
        price,
        guestNumber,
        restrictions,
        eventType,
        host: userId,
      })
    ).then((event) => {
      setNewEvent(event);
      setImageUploadElement(true);
    });
  };
  return (
    <div className="event-form-cont">
      <form
        className="event-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="h2-wrapper">
          {type === "edit" ? (
            <h2>Edit: {event.title}</h2>
          ) : (
            <h2>Make an Event</h2>
          )}
        </div>
        <div className="errors">{errors?.location} </div>
        <label>
          Location
          <AddressInput
            setLocationName={setLocationName}
            setCoordinates={setCoordinates}
            type={type}
            name={locationName}
          />
        </label>
        <div className="errors">{errors?.title}</div>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
        </label>
        <div className="errors">{errors?.description}</div>
        <label>
          Description
          <input
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
          />
        </label>
        <div className="errors">{errors?.price}</div>
        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="price"
          />
        </label>
        <div className="errors">{errors?.guests}</div>
        <label>
          Guests
          <input
            type="number"
            value={guestNumber}
            onChange={(e) => setGuestNumber(e.target.value)}
          />
        </label>
        <div className="errors">{errors?.restrictions}</div>
        <label>
          Restrictions
          <input
            type="text"
            value={restrictions}
            onChange={(e) => setRestrictions(e.target.value)}
            placeholder="restrictions"
          />
        </label>
        <div className="errors">{errors?.images}</div>
        <fieldset
          className="event-type radio"
          onChange={(e) => setEventType(e.target.value)}
          value={eventType}
        >
          <p id="event-type-legend">Event Type</p>
          <input type="radio" id="in-person" name="rating" value="in-person" />
          <label htmlFor="in-person">In-person</label>
          <input type="radio" id="to-go" name="rating" value="to-go" />
          <label htmlFor="to-go">To-go</label>
          <input type="radio" id="both" name="rating" value="both" />
          <label htmlFor="both">Both</label>
        </fieldset>
        <div className="create-btn-container">
          <button
            type="submit"
            disabled={locationName.length === 0 || title.length === 0}
          >
            Create
          </button>
        </div>
      </form>
      <EventCard />
      {imageUploadElement && (
        <label>
          Images
          <UploadImages
            setImageUploadElement={setImageUploadElement}
            event={newEvent}
          />
        </label>
      )}
    </div>
  );
}

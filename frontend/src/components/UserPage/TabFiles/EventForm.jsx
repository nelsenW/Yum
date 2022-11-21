import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EventCard from "../../Events/EventCard";
import "./eventForm.css";
import { clearEventErrors } from "../../../store/events";
import { updateEvent, composeEvent } from "../../../store/events";
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
  const errors = useSelector((state) =>
    state.errors.event ? state.errors.event : []
  );
  const [eventType, setEventType] = useState(event?.eventType ?? "");
  const userId = useSelector((state) => state.session.user._id);
  const dispatch = useDispatch();
  const [imageUploadElement, setImageUploadElement] = useState(false);
  const [newEvent, setNewEvent] = useState(null);
  const [today, setToday] = useState(new Date().toLocaleDateString());
  const [date, setDate] = useState(today);
  // const dayAfter = date;
  // dayAfter?.setDate(dayAfter?.getDate() + 1);

  useEffect(() => {
    return () => {
      dispatch(clearEventErrors());
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
      dispatch(
        updateEvent({
          event: {
            _id: event._id,
            location: location,
            title,
            description,
            date,
            price,
            guestNumber,
            restrictions,
            eventType,
            host: userId,
            expireAt: date,
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
        date,
        price,
        guestNumber,
        restrictions,
        eventType,
        host: userId,
        expireAt: date,
      })
    ).then((event) => {
      setNewEvent(event);
      setImageUploadElement(true);
      // console.log(imageUploadElement);
    });
  };

  // console.log(dayAfter);

  // console.log(Object.values(errors).length);
  return (
    <div className="event-form-cont">
      <form
        className="event-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="h2-wrapper event">
          {type === "edit" ? (
            <h2>Edit: {event.title}</h2>
          ) : (
            <h2>Make an Event</h2>
          )}
        </div>
        <AddressInput
          setLocationName={setLocationName}
          setCoordinates={setCoordinates}
          type={type}
          name={locationName}
        />
        <div className="errors">{errors?.location} </div>
        <label>
          <span>Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
        </label>
        <div className="errors">{errors?.title}</div>

        <label>
          <span>Description</span>
          <input
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
          />
        </label>
        <div className="errors">{errors?.description}</div>
        <label>
          <span>Date</span>
          <input
            type="datetime-local"
            id="event-date"
            name="event-date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            // max="2018-06-14T00:00"
          />
        </label>
        <div className="errors">{errors?.date}</div>

        <label>
          <span>Price</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="price"
            min={0}
          />
        </label>
        <div className="errors">{errors?.price}</div>

        <label>
          <span>Guests</span>
          <input
            type="number"
            value={guestNumber}
            onChange={(e) => setGuestNumber(e.target.value)}
            min={0}
          />
        </label>
        <div className="errors">{errors?.guests}</div>

        <label>
          <span>Restrictions</span>
          <input
            type="text"
            value={restrictions}
            onChange={(e) => setRestrictions(e.target.value)}
            placeholder="restrictions"
          />
        </label>
        <div className="errors">{errors?.restrictions}</div>

        {/* <div className="errors">{errors?.images}</div> */}
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
        <div className="errors">{errors?.eventType}</div>

        <div className="create-btn-container">
          <button
            type="submit"
            // disabled={locationName.length === 0 || title.length === 0}
          >
            {type === "edit" ? "Edit" : "Create"}
          </button>
        </div>
      </form>
      {/* <EventCard /> */}
      {imageUploadElement && errors.length === 0 ? (
        <div className="upload-images-modal-container">
          <UploadImages
            setImageUploadElement={setImageUploadElement}
            event={newEvent}
            setUserModal={setUserModal}
          />
        </div>
      ) : null}
    </div>
  );
}

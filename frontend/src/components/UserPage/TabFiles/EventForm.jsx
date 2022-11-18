import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EventCard from "../../Events/EventCard";
import "./eventForm.css";
import { clearSessionErrors } from "../../../store/session";
import { composeEvent } from "../../../store/events";
import AddressInput from "../../Map/AddressInput";
import UploadImages from "../../Events/UploadImages";

function AddEventForm() {
  const [locationName, setLocationName] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [guestNumber, setGuestNumber] = useState(1);
  const [restrictions, setRestrictions] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const [eventType, setEventType] = useState("");
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
    <div>
      <form
        className="event-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="h2-wrapper">
          <h2>Make an Event</h2>
        </div>
        <div className="errors">{errors?.location} </div>
        <label>
          Location
          <AddressInput
            setLocationName={setLocationName}
            setCoordinates={setCoordinates}
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
          className="event-type"
          onChange={(e) => setEventType(e.target.value)}
          value={eventType}
        >
          <legend>Event Type</legend>
          <input type="radio" id="in-person" name="rating" value="in-person" />
          <label htmlFor="in-person">In-person</label>
          <input type="radio" id="to-go" name="rating" value="to-go" />
          <label htmlFor="to-go">To-go</label>
          <input type="radio" id="both" name="rating" value="both" />
          <label htmlFor="both">Both</label>
        </fieldset>
        <button
          type="submit"
          disabled={locationName.length === 0 || title.length === 0}
        >
          Create
        </button>
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

export default AddEventForm;

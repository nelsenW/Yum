import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { composeEvent } from "../../../store/events";
import { composeEvent } from "../store/events";
// import { clearSessionErrors } from "../../../store/session";
import { clearSessionErrors } from "../store/session";
// import EventCard from "../../Events/EventCard";
// import AddressInput from "../../Map/AddressInput";
import AddressInput from "../components/Map/AddressInput";
// import "..//eventForm.css";

function AddEventForm() {
  const [locationName, setLocationName] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [guests, setGuests] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imageFilesUrls, setImageFilesUrls] = useState([]);
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  // const update = (field) => {
  //   let setState;
  //   switch (field) {
  //     case "location":
  //       setState = setLocationName;
  //       break;
  //     case "title":
  //       setState = setTitle;
  //       break;
  //     case "description":
  //       setState = setDescription;
  //       break;
  //     case "price":
  //       setState = setPrice;
  //       break;
  //     case "guests":
  //       setState = setGuests;
  //       break;
  //     case "restrictions":
  //       setState = setRestrictions;
  //       break;
  //     // case "images":
  //     //   setState = setRestrictions;
  //     //   break;
  //     default:
  //       return;
  //   }
  //   return (e) => setState(e.currentTarget.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const location = {
      type: "Point",
      name: locationName,
      coordinates: coordinates,
    };

    const formData = new FormData();
    formData.append("location", location);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("guests", guests);
    formData.append("restrictions", restrictions);

    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("images", imageFiles[i]);
    }

    dispatch(composeEvent(formData));
  };

  const handleFiles = (e) => {
    const files = Object.values(e.currentTarget.files);

    if (files) {
      files.map((file) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          setImageFiles((prevState) => [...prevState, file]);
          setImageFilesUrls((prevState) => [...prevState, fileReader.result]);
        };
      });
    }
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
            setLocation={setLocationName}
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
            type="text"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder="guests"
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
        <label>
          Images
          <input onChange={handleFiles} type="file" multiple />
          {/* <input
            type="text"
            value={restrictions}
            onChange={update("restrictions")}
            placeholder="restrictions"
          /> */}
        </label>
        <button
          type="submit"
          disabled={locationName.length === 0 || title.length === 0}
        >
          Create
        </button>
      </form>
      {/* <EventCard /> */}
    </div>
  );
}

export default AddEventForm;

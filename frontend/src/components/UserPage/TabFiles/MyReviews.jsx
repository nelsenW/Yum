import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEvent,
  fetchEvents,
  fetchUserEventsAttending,
  updateEvent,
} from "../../../store/events";
import { fetchOfMeReviews } from "../../../store/reviews";
import EventForm from "./EventForm";
import "./myPosts.css";

export default function MyPosts({ setTab, setUserModal, type }) {
  const dispatch = useDispatch();
  const userEvents = useSelector((state) =>
    state.events.user ? Object.values(state.events.user) : []
  );
  const userId = useSelector((state) => state.session.user._id);

  useEffect(() => {
    if (type !== "MyReviews") {
      dispatch(fetchOfMeReviews(userId));
    }
  }, [dispatch, type]);

//   const handleClick = (e, event) => {
//     let newGuestList = event?.guestLists;
//     for (let i = 0; i < newGuestList.length; i++) {
//       newGuestList = newGuestList.filter((guest) => guest._id !== userId);
//     }
//     event.guestLists = newGuestList;
//     dispatch(updateEvent({ event })).then(() =>
//       dispatch(fetchUserEventsAttending(userId))
//     );
//   };

  return (
    <div>
      <h1>{type === "MyReviews" ? "Reviews That I've Made" : "Reviews That Others Have Made For Me"}</h1>
      {userEvents?.length === 0 ? (
        <div id="no-events-message">
          <p>{`You're not ${
            type === "hosted" ? "hosting" : "attending"
          } any events`}</p>
        </div>
      ) : (
        userEvents?.map((event) => {
          return (
            <div className="user-event" key={event.id}>
              <h1>{event.title}</h1>
              <div className="event-buttons">
                {type === "hosted" ? (
                  <>
                    <button
                      className="edit-event"
                      onClick={() =>
                        setTab(
                          <EventForm
                            type={"edit"}
                            event={event}
                            setUserModal={setUserModal}
                          />
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="delete-event"
                      onClick={() => {
                        dispatch(deleteEvent(event._id));
                        dispatch(fetchEvents());
                      }}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    className="edit-event"
                    onClick={(e) => handleClick(e, event)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

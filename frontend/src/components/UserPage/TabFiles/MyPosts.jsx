import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEvent,
  fetchEvents,
  fetchUserEvents,
} from "../../../store/events";
import EventForm from "./EventForm";
import "./myPosts.css";

export default function MyPosts({ setTab, setUserModal }) {
  const dispatch = useDispatch();
  const userEvents = useSelector((state) =>
    state.events.user ? Object.values(state.events.user) : []
  );
  const userId = useSelector((state) => state.session.user._id);

  useEffect(() => {
    dispatch(fetchUserEvents(userId));
  }, []);

  return (
    <div>
      <h1>My Events</h1>
      {userEvents?.map((event) => {
        return (
          <div className="user-event">
            <h1>{event.title}</h1>
            <div className="event-buttons">
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
            </div>
          </div>
        );
      })}
    </div>
  );
}

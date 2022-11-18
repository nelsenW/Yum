import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_EVENTS = "EVENTS/RECEIVE_EVENTS";
const RECEIVE_USER_EVENTS = "EVENTS/RECEIVE_USER_EVENTS";
const RECEIVE_NEW_EVENT = "EVENTS/RECEIVE_NEW_EVENT";
const RECEIVE_EVENT_ERRORS = "EVENTS/RECEIVE_EVENT_ERRORS";
const CLEAR_EVENT_ERRORS = "EVENTS/CLEAR_EVENT_ERRORS";
const REMOVE_EVENT = "EVENTS/REMOVE_EVENT";

const receiveEvents = (events) => ({
  type: RECEIVE_EVENTS,
  events,
});

const removeEvent = (eventId) => ({
  type: REMOVE_EVENT,
  eventId,
});

const receiveUserEvents = (events) => ({
  type: RECEIVE_USER_EVENTS,
  events,
});

const receiveNewEvent = (event) => ({
  type: RECEIVE_NEW_EVENT,
  event,
});

const receiveErrors = (errors) => ({
  type: RECEIVE_EVENT_ERRORS,
  errors,
});

export const clearEventErrors = (errors) => ({
  type: CLEAR_EVENT_ERRORS,
  errors,
});

export const fetchEvents = () => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/events/");
    const events = await res.json();
    dispatch(receiveEvents(events));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUserEvents = (userId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/events/users/${userId}`);
    const events = await res.json();
    dispatch(receiveUserEvents(events));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const composeEvent = (data) => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/events/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const event = await res.json();
    dispatch(receiveNewEvent(event));
    return event;
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    await jwtFetch(`/api/events/${eventId}`, {
      method: "DELETE",
    }).then(dispatch(removeEvent(eventId)));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const addUserToEvent = (data) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/events/${data.event._id}`, {
      method: "PATCH",
      body: JSON.stringify(data.event),
    });
    const event = await res.json();
    dispatch(receiveNewEvent(event));
    return event;
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

const nullErrors = null;

export const eventErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_EVENT_ERRORS:
      return action.errors;
    case RECEIVE_NEW_EVENT:
    case CLEAR_EVENT_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const eventsReducer = (
  state = { all: {}, user: {}, new: undefined },
  action
) => {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return { ...state, all: action.events, new: undefined };
    case RECEIVE_USER_EVENTS:
      return { ...state, user: action.events, new: undefined };
    case RECEIVE_NEW_EVENT:
      return { ...state, new: action.event };
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined };
    case REMOVE_EVENT:
      const newState = { ...state };
      newState.user.splice(
        state.user.findIndex((object) => {
          return object._id === action.eventId;
        }),
        1
      );
      newState.all.splice(
        state.user.findIndex((object) => {
          return object._id === action.eventId;
        }),
        1
      );
      return newState;
    default:
      return state;
  }
};

export default eventsReducer;

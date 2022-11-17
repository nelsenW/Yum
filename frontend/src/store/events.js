import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_EVENTS = "EVENTS/RECEIVE_EVENTS";
const RECEIVE_USER_EVENTS = "EVENTS/RECEIVE_USER_EVENTS";
const RECEIVE_NEW_EVENT = "EVENTS/RECEIVE_NEW_EVENT";
const RECEIVE_EVENT_ERRORS = "EVENTS/RECEIVE_EVENT_ERRORS";
const CLEAR_EVENT_ERRORS = "EVENTS/CLEAR_EVENT_ERRORS";

const receiveEvents = (events) => ({
  type: RECEIVE_EVENTS,
  events,
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

export const fetchUserEvents = (id) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/events/user/${id}`);
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
      return { ...state, all: action.EVENTS, new: undefined };
    case RECEIVE_USER_EVENTS:
      return { ...state, user: action.EVENTS, new: undefined };
    case RECEIVE_NEW_EVENT:
      return { ...state, new: action.EVENT };
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined };
    default:
      return state;
  }
};

export default eventsReducer;

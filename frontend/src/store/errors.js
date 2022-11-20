import { combineReducers } from "redux";
import { eventErrorsReducer } from "./events";
import { sessionErrorsReducer } from "./session";

export default combineReducers({
  session: sessionErrorsReducer,
  event: eventErrorsReducer,
});

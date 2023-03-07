import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import pariReducer from "./pari.reducer";

export default combineReducers({
  userReducer,
  pariReducer,
});

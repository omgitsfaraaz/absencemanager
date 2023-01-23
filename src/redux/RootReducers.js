import { combineReducers } from "redux";
import appReducer from "./reducers/App/appReducer";

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;

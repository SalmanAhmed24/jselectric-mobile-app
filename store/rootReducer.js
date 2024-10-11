import { combineReducers } from "redux";
import { userReducer } from "./reducers/user-reducer";
import { taskReducer } from "./reducers/task-reducer";
import { homeReducer } from "./reducers/home-reducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  taskReducer,
  homeReducer,
});
export default rootReducer;

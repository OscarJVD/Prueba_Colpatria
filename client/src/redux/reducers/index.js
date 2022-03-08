import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import theme from "./themeReducer";
import task from "./taskReducer";
import confirm from "./confirmReducer";

export default combineReducers({ auth, alert, theme, task, confirm });

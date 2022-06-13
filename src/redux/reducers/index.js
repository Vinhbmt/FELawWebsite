import { combineReducers } from "redux";
import handleAPIState from "./apiReducer";
import handleAuthState from "./authReducer";
import lawyerReducer from "./lawyerReducer";
import ThemeReducer from "./themeReducer";

export default combineReducers({
    apiState: handleAPIState,
    authState: handleAuthState,
    lawyerReducer,
    ThemeReducer
})
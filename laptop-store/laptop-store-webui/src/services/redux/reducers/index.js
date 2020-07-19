import { combineReducers } from "redux";
import filterReducer from "./filterReducer";
import modalReducer from "./modalReducer";
import imageReducer from "./imageReducer";
import addressReducer from "./addressReducer";

export default combineReducers({
    filter: filterReducer,
    modal: modalReducer,
    images: imageReducer,
    address: addressReducer,
});

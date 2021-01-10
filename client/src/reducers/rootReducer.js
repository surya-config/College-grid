import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import questionsReducer from "./questionsReducer"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  questions: questionsReducer
});

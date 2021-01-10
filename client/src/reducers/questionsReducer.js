import { SET_QUESTION } from "../actions/types";

const initialState = {
    question_id: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_QUESTION:
      return {
        ...state,
        question_id: action.payload,
      };
    
    default:
      return state;
  }
}

import {
  GET_ABSENTEES,
  GET_MEMBERS,
} from "../../ActionTypes/appjsActions/actionTypes";

const initialState = {
  members: "",
  absentees: "",
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEMBERS:
      return {
        ...state,
        members: action.payload,
      };
    case GET_ABSENTEES:
      return {
        ...state,
        absentees: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;

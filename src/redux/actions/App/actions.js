import { memberJson } from "../../../api/json_files/members";
import { absenceJson } from "../../../api/json_files/absences";
import {
  GET_ABSENTEES,
  GET_MEMBERS,
} from "../../ActionTypes/appjsActions/actionTypes";

export const getAllMembers = () => {
  return {
    type: GET_MEMBERS,
    payload: memberJson,
  };
};

export const getAllAbsentees = () => {
  return {
    type: GET_ABSENTEES,
    payload: absenceJson,
  };
};

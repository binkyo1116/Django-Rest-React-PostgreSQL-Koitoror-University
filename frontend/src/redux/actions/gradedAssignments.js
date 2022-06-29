import axios from "axios";
import * as actionTypes from "./types";

// Backend API URL
import { API_HOST as uri } from '../../api/fetch/api'


const getGradedASNTListStart = () => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENT_LIST_START
  };
};

const getGradedASNTListSuccess = assignments => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENTS_LIST_SUCCESS,
    assignments
  };
};

const getGradedASNTListFail = error => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENTS_LIST_FAIL,
    error: error
  };
};

export const getGradedASNTS = (username, token) => {
  return dispatch => {
    dispatch(getGradedASNTListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      // "Content-Length": "<calculated when request is sent>",
      // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${uri}/graded-assignments/?username=${username}`)
      .then(res => {
        const assignments = res.data;
        dispatch(getGradedASNTListSuccess(assignments));
      })
      .catch(err => {
        dispatch(getGradedASNTListFail(err));
      });
  };
};


const createASNTStart = () => {
  return {
    type: actionTypes.CREATE_ASSIGNMENT_START
  };
};

const createASNTSuccess = assignment => {
  return {
    type: actionTypes.CREATE_ASSIGNMENT_SUCCESS,
    assignment
  };
};

const createASNTFail = error => {
  return {
    type: actionTypes.CREATE_ASSIGNMENT_FAIL,
    error: error
  };
};

export const createGradedASNT = (token, asnt) => {
  return dispatch => {
      dispatch(createASNTStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      // "Content-Length": "<calculated when request is sent>",
      // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: `Bearer ${token}`
    };
    axios
      .post(`${uri}/graded-assignments/create/`, asnt)
      .then(res => {
        console.log("success");
          dispatch(createASNTSuccess());
      })
      .catch(err => {
          dispatch(createASNTFail());
      });
  };
};

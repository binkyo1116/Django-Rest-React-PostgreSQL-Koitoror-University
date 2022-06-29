import axios from "axios";
import * as actionTypes from "./types";

// Backend API URL
import { API_HOST as uri } from '../../api/fetch/api'


const getASNTListStart = () => {
  return {
    type: actionTypes.GET_ASSIGNMENT_LIST_START
  };
};

const getASNTListSuccess = assignments => {
  return {
    type: actionTypes.GET_ASSIGNMENTS_LIST_SUCCESS,
    assignments
  };
};

const getASNTListFail = error => {
  return {
    type: actionTypes.GET_ASSIGNMENTS_LIST_FAIL,
    error: error
  };
};

export const getASNTS = token => {
  return dispatch => {
    dispatch(getASNTListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      // "Content-Length": "<calculated when request is sent>",
      // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${uri}/assignments/`)
      .then(res => {
        const assignments = res.data;
        console.log('ASSIGNMENT ===> ', assignments)
        dispatch(getASNTListSuccess(assignments));
      })
      .catch(err => {
        dispatch(getASNTListFail());
      });
  };
};


const getASNTDetailStart = () => {
  return {
    type: actionTypes.GET_ASSIGNMENT_DETAIL_START
  };
};

const getASNTDetailSuccess = assignment => {
  return {
    type: actionTypes.GET_ASSIGNMENT_DETAIL_SUCCESS,
    assignment
  };
};

const getASNTDetailFail = error => {
  return {
    type: actionTypes.GET_ASSIGNMENT_DETAIL_FAIL,
    error: error
  };
};

export const getASNTSDetail = (token, id) => {
  return dispatch => {
    dispatch(getASNTDetailStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      // "Content-Length": "<calculated when request is sent>",
      // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: `Bearer ${token}`
    };
    axios
      .get(`${uri}/assignments/${id}/`)
      .then(res => {
        const assignment = res.data;
        dispatch(getASNTDetailSuccess(assignment));
      })
      .catch(err => {
        dispatch(getASNTDetailFail());
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

export const createASNT = (token, asnt) => {
  return dispatch => {
    dispatch(createASNTStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      // "Content-Length": "<calculated when request is sent>",
      // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: `Bearer ${token}`
    };
    axios
      .post(`${uri}/assignments/`, asnt)
      .then(res => {
        console.log('CREATED ASSIGNMENT RESPONSE   =====>  ', res)
        dispatch(createASNTSuccess());
      })
      .catch(err => {
        dispatch(createASNTFail());
      });
  };
};

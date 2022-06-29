import { combineReducers } from 'redux';
// import app from './appReducer';
import auth from "./auth";
import assignmentReducer from "./assignments";
import gradedAssignmentReducer from "./gradedAssignments";


const rootReducer = combineReducers({
  // app,
  auth,
  assignments: assignmentReducer,
  gradedAssignments: gradedAssignmentReducer
});

export default rootReducer;

import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";

// CSS Imports
import "antd/dist/antd.min.css";
import "./index.css";

// Local Imports
import BaseRouter from "./routes";
import { authCheckState } from "./redux";


export default function App(props) {
  // console.log('PROPS APP ----> ', props)

  const dispatch = useDispatch()
  
  useEffect(() => {

    return () => {
      onTryAutoSignup();
    };
  }, []);

  function onTryAutoSignup() {
    // return () => dispatch(actions.authCheckState())
    // return dispatch(actions.authCheckState())
    
    // return () => dispatch(authCheckState())
    return dispatch(authCheckState())
  };


  return (
    <>
      <Router>
          <BaseRouter />
      </Router>
    </>
  );
}

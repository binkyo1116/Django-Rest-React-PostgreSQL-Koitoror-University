import React from "react";
// import { Route, Routes, useRoutes, Navigate, } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// local Imports
import Hoc from "../hoc/hoc";

import PrivateRoute, { PrivateWrapper } from '../routes/utils/PrivateRoute'

import CustomLayout from "../containers/Layout";

import Auth from '../pages/Auth';
import Signup from "../pages/Auth/SignupOLD";
import Login from "../pages/Auth/LoginOLD";
// import LoginPage from '../pages/LoginPage'
import Activate from "../pages/Auth/Activate";
import ResetPassword from "../pages/Auth/ResetPassword";
import ResetPasswordConfirm from "../pages/Auth/ResetPasswordConfirm";

import Profile from "../pages/Profile";

import Home from '../pages/Home';
// import HomePage from '../pages/HomePage'

import AssignmentList from "../pages/AssignmentList";
import AssignmentDetail from "../pages/AssignmentDetail";
import AssignmentCreate from "../pages/AssignmentCreate";
import NotFoundPage from "../pages/NotFoundPage";


const BaseRouter = () => {

  const hooksData = useSelector(state => {
    // console.log('STATE App ------>', state)
    // console.log('STATE App auth ------>', state.auth)
    // console.log('STATE App token ------>', state.auth.token)
    return {
      isAuthenticated: state.auth.token !== null
    };
  });

  console.log(hooksData)


  return (
    <Hoc>

      <Routes>

        // AUTH ROUTES
        <Route exact path="/signup/" element={<Signup />} />
        {/* <Route exact path="/auth/" element={<Auth/>} /> */}
        {/* <Route exact path="/login/" element={<Auth />} /> */}
        <Route exact path="/login" element={<Auth />} />
        <Route exact path="/login1/" element={<Login />} />
        {/* <Route exact path="/login2/" element={<LoginPage />} /> */}
        <Route exact path='/reset_password' element={<ResetPassword />} />
        <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />
        <Route exact path="/activate/:uid/:token" element={<Activate />} />
        
        // LAYOUT ROUTES
        <Route element={<CustomLayout {...hooksData} />}>

          <Route exact path="/profile/:user_id" element={<Profile />} />
          {/* <Route exact path="/profile" element={<Profile />} /> */}

          // ASSIGNMENTS ROUTES
          <Route path="/" element={<Home />} />
          <Route exact path="/assignment" element={<AssignmentList />} />
          <Route exact path="/create/" element={<AssignmentCreate />} />
          <Route exact path="/assignments/:id" element={<AssignmentDetail />} />

          // PROTECTED ROUTES
          {/* <Route exact path='/home2' element={<PrivateRoute element={HomePage}/>}/> */}
          {/* <Route element={<PrivateWrapper />}> */}
          {/* <Route path="/home2" element={<HomePage />} /> */}
          {/* </Route>  */}

        </Route>

        // HANDLE NOT FOUND ROUTE
        <Route exact path="/not-found" element={<NotFoundPage />} />
        <Route path='*' element={<NotFoundPage />} />

      </Routes>

    </Hoc>
  )
};

export default BaseRouter;

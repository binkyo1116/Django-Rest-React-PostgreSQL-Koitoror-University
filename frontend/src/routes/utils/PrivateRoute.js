import { Route, Navigate, Routes, Outlet, useRoutes } from 'react-router-dom'
import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { AuthContextProvider } from '../../context/AuthContext'
import { useSelector } from 'react-redux';
import get from 'lodash/get';

// export default const PrivateRoute = ({ children, ...rest }) => {
// const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
// const PrivateRoute = ({ children, ...rest }) => {
// const PrivateRoute = () => {
const PrivateRoute = ({ children }) => {
    //REDUX
    // const isLogged = false;
    // const isAuthenticated = false;

    //CONTEXT
    let { user } = useContext(AuthContext)

    // return( ( !user || !accessToken ) ? <Navigate to="/login" /> : children )
    return (!user || !accessToken ? <Navigate to="/login" /> : <AuthContextProvider>children</AuthContextProvider>)
    // return( !user ? <Navigate to="/login" /> : children)
    // return( <Route {...rest} element={!user ? <Navigate to="/login" /> : children} /> */}
    // return( <Route {...rest}> {!user ? <Navigate  to="/login" /> :   children} </Route>

    // return isLogged ? <Component/> : <Navigate to="/login" />;
    // return isLogged ? children : <Navigate to="/login" />;
    // return isAuthenticated ? children : <Navigate to="/login" />;

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    // return (user || accessToken || isAuthenticated) ? <Outlet /> : <Navigate to="/login" />;

}

export default PrivateRoute;


// export const PrivateWrapper = ({ auth: { isAuthenticated } }) => {
export const PrivateWrapper = () => {
    //REDUX
    // const profile = useSelector((state) => state.auth.profile);
    // const accessToken = get(profile, 'accessToken');
    // const routing = useRoutes(routes(accessToken));

    //CONTEXT
    let { user } = useContext(AuthContext)

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return (user || accessToken || isAuthenticated) ? <Outlet /> : <Navigate to="/login" />;

};

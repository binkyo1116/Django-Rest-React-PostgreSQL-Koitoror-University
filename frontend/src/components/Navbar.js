import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { connect } from "react-redux";

// import { logout } from "../actions/auth";
import { logout } from "../redux";

import { Layout, Menu } from "antd";

const { Header } = Layout;

const navbar = useNavigate((props) => {
  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[props.location.pathname]}
      >
        <Menu.Item key="/">
          <NavLink to="/">Home</NavLink>
        </Menu.Item>
        <Menu.Item key="/create">
          <NavLink to="/create">create</NavLink>
        </Menu.Item>
        {props.isAuthenticated
          ? [
              <Menu.Item key="/profile">
                <NavLink to="/profile">profile</NavLink>
              </Menu.Item>,
              <Menu.Item key="/login" onClick={props.logout}>
                <div>Logout</div>
              </Menu.Item>,
            ]
          : [
              <Menu.Item key="/login">
                <NavLink to="/login">Login</NavLink>
              </Menu.Item>,
              <Menu.Item key="/signup">
                <NavLink to="/signup">Sign Up</NavLink>
              </Menu.Item>,
            ]}
      </Menu>
    </Header>
  );
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(navbar);

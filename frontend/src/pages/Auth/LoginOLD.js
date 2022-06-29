import React from "react";
// import React, {useContext} from 'react'
import { Form, Input, Button, Spin } from "antd";
import Icon from '@ant-design/icons';
import { UserOutlined, LockOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
// import { UserOutlined, LockOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

// import * as actions from "../../redux/actions/auth";
import { authLogin } from "../../redux";

const FormItem = Form.Item;

// const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />; 
// const antIcon = <Loading3QuartersOutlined style={{ fontSize: 24 }} spin />; 
const antIcon = <Spin
  prefix={<Loading3QuartersOutlined
    // className="site-form-item-icon" 
    // style={{ color: "rgba(0,0,0,.25)" }} 
    style={{ fontSize: 24 }}
  />}
/>



export default function NormalLoginForm(props) {
  // console.log('LOGIN PROPS ----> ', props)

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        onAuth(values.userName, values.password);
        props.navigate("/");
      }
    });
  };

  const hooksData = useSelector(state => {
    // console.log(state)
    return {
      loading: state.auth.loading,
      error: state.auth.error
    };
  });

  const dispatch = useDispatch()

  function onAuth(username, password) {
    // return () => dispatch(actions.authLogin(username, password))
    return () => dispatch(authLogin(username, password))
  };

  let errorMessage = null;
  if (hooksData.error) {
    errorMessage = <p>{hooksData.error.message}</p>;
  }

  return (
    <div>
      {errorMessage}
      {hooksData.loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <Form onSubmit={handleSubmit} className="login-form">
          <FormItem name="username" rules={[{ required: true, message: "Please input your username!" }]} >

            <Input prefix={<UserOutlined className="site-form-item-icon" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Username" />

          </FormItem>
          <FormItem name="password" rules={[{ required: true, message: "Please input your Password!" }]} >

            <Input
              prefix={<LockOutlined className="site-form-item-icon" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
              shape="round"
            >
              Login
            </Button>
            Or
            <NavLink style={{ marginRight: "10px" }} to="/signup/">
              {" "}
              Signup
            </NavLink>
          </FormItem>
        </Form>
      )}
    </div>
  );
}

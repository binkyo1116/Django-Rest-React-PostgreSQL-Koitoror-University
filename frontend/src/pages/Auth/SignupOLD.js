import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
// import * as actions from "../../redux/actions/auth";
import { authLogin, authSignup } from "../../redux";

const FormItem = Form.Item;
const Option = Select.Option;


export default function RegistrationForm(props) {
  console.log('Registration props', props)
  const [state, setState] = useState({
    confirmDirty: false
  });

  const hooksData = useSelector(state => {
    console.log(state)
    return {
      loading: state.auth.loading,
      error: state.auth.error
    };
  });

  console.log(hooksData)

  const dispatch = useDispatch()

  function onAuth(username, email, password, confirm, is_student) {
    return () => dispatch(authSignup(username, email, password, confirm, is_student))
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Registration_next PROPS ----> ', props)

    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let is_student = false;
        if (values.userType === "student") is_student = true;
        onAuth(
          values.userName,
          values.email,
          values.password,
          values.confirm,
          is_student
        );
        props.history("/");
      }
    });
  };

  const handleConfirmBlur = e => {
    const value = e.target.value;
    setState({ confirmDirty: state.confirmDirty || !!value });
  };

  const compareToFirstPassword = (rule, value) => {
    const form = props.form;
    if (value && value !== form.getFieldValue("password")) {
      Promise.resolve("Two passwords that you enter is inconsistent!");
    } else {
      Promise.reject();
    }
  };

  const validateToNextPassword = (rule, value) => {
    const form = props.form;
    if (value && state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    Promise.resolve();
  };


  return (
    <Form onSubmit={handleSubmit}>

      <FormItem name="userName" rules={[{ required: true, message: "Please input your username!" }]} >

        <Input prefix={<UserOutlined className="site-form-item-icon" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Username" />

      </FormItem>


      <FormItem name="email" rules={[
        {
          type: "email",
          message: "The input is not valid E-mail!"
        },
        {
          required: true,
          message: "Please input your E-mail!"
        }
      ]} >

        <Input
          prefix={<MailOutlined className="site-form-item-icon" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Email"
        />

      </FormItem>

      <FormItem name="password" rules={[{ required: true, message: "Please input your password!" }]} >

        <Input
          prefix={<LockOutlined className="site-form-item-icon" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Password"
        />

      </FormItem>


      <FormItem name="confirm" rules={[{ required: true, message: "Please confirm your password!" }]} >

        <Input
          prefix={<LockOutlined className="site-form-item-icon" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Password"
          onBlur={handleConfirmBlur}
        />

      </FormItem>

      <FormItem name="userType" rules={[{ required: true, message: "Please select a user!" }]} >

        <Select placeholder="Select a user type">
          <Option value="student">Student</Option>
          <Option value="teacher">Teacher</Option>
        </Select>
      </FormItem>

      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "10px" }}
          shape="round"
        >
          Signup
        </Button>
        Or
        <NavLink style={{ marginRight: "10px" }} to="/login/">
          {" "}
          Login
        </NavLink>
      </FormItem>
    </Form>
  );
}

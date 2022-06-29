import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../../redux";
import { Form, Input, Button } from 'antd';


const ResetPassword = (props) => {
  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;
  const [form] = Form.useForm();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFinish = (e) => {
    // e.preventDefault();

    props.reset_password(email);
    setRequestSent(true);
  };

  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (requestSent) return <Navigate to="/" />;
  return (
    <div 
      style={{
      display: 'flex', 
      justifyContent: 'center', 
      marginTop: 50
      }}
    >

      <Form
          name="reset_password"
          form={form}

          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          required
          style={{
            // padding: 0, height: 50,
            padding: 20
          }}

      >

      <h1>Request Password Reset:</h1>
      
      <Form.Item
            name="email"
            // label="Email address"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            hasFeedback
            onChange={(e) => onChange(e)}
            rules={[
                {
                    required: true,
                    message: 'Please input your email.',
                },
                {
                    type: "email",
                    message: 'Your email is invalid.',
                }
            ]}
        >
            <Input placeholder='Your Email' size="large" style={{maxWidth: "550px"}} />
        </Form.Item>
        <br />

        <Button
            // loading={loading}
            // loading={auth.loading}
            type="primary"
            className="form-submit-btn"
            htmlType="submit"
            shape="round"
            // icon={<UserAddOutlined />}
            size="large"
        >
          Reset Password
        </Button>
      </Form>

    </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);

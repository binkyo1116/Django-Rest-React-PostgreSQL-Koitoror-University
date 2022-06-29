import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Input, Button } from 'antd';

import { reset_password_confirm } from "../../redux";

const ResetPasswordConfirm = (props) => {
  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

  const [form] = Form.useForm();
  const params = useParams()

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFinish = (e) => {
    // e.preventDefault();

    // const uid = props.match.params.uid;
    // const token = props.match.params.token;
    const uid = params.uid;
    const token = params.token;
    // console.log('UID', uid, 'TOKEN', token)

    props.reset_password_confirm(uid, token, new_password, re_new_password);
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
          name="reset_password_confirm"
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

          <Form.Item
              name="new_password"
              hasFeedback
              // label="Password"
              onChange={(e) => onChange(e)}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                  {
                      required: true,
                      message: 'Please input your password.',
                  },
                  { min: 6, message: 'Password must be minimum 6 characters.' },
              ]}
            >
                <Input.Password placeholder='New Password' size="large" style={{maxWidth: 550}} />
            </Form.Item>
            <Form.Item
                name="re_new_password"
                hasFeedback
                // label="Password"
                onChange={(e) => onChange(e)}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                    {
                        required: true,
                        message: 'Please input your password.',
                    },
                    { min: 6, message: 'Password must be minimum 6 characters.' },
                ]}
              >
                  <Input.Password placeholder='Confirm New Password' size="large" style={{maxWidth: 750}} />
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
      {/* <form onSubmit={(e) => onSubmit(e)}> */}
        {/* <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="New Password"
            name="new_password"
            value={new_password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Confirm New Password"
            name="re_new_password"
            value={re_new_password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div> */}
        {/* <button className="btn btn-primary" type="submit">
          Reset Password
        </button> */}
      {/* </form> */}
    </div>

  );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);

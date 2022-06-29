import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, message, notification } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import SocialNetworks from './SocialNetworks';
import { Typography } from 'antd';
import get from 'lodash/get';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// import { authLogin } from '../../redux/actions/auth';
import { authLogin } from '../../redux';

const { Title } = Typography;


export default function SignIn() {
    const [loading, setLoading] = useState(true);

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector(state => state)
    console.log('STATE LOGIN', auth)


    const onFinish = async values => {

        const payload = {
            username: get(values, 'username', ''),
            password: get(values, 'password', '')
        }

        // setLoading(true)
        console.log('***SIGNUP LOADING ', loading)
        
        dispatch(authLogin(payload))
        
        setLoading(auth.loading)
        console.log('***SIGNUP LOADING ', loading)
        
        form.resetFields()
        // navigate('/')

    };

    useEffect(() => {
        if (loading === false) {
            navigate('/');
            }
        
        }, [auth]);


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                name="signin"
                form={form}
                initialValues={{
                    remember: false,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            // style={{padding: 0, height: 50}}
            style={{padding: 20}}
            >
                <Title level={2} className="text-center">Sign in</Title>
                <SocialNetworks />

                <div className="option-text">or use your account</div>

                <Form.Item
                    name="username"
                    label="Username"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username.',
                        }
                    ]}
                >
                    <Input placeholder='Username' size="large" />
                </Form.Item>

                <Form.Item
                    name="password"
                    hasFeedback
                    label="Password"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please input your password.',
                //     },
                //     { min: 6, message: 'Password must be minimum 6 characters.' },
                // ]}
                >
                    <Input.Password placeholder='Password' size="large" />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="#">
                        Forgot password?
                    </a>
                </Form.Item>


                <Button
                    loading={auth.loading}
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    icon={<LoginOutlined />}
                    size="large"
                >
                    Sign In
                </Button>
            </Form>
        </>
    )
}
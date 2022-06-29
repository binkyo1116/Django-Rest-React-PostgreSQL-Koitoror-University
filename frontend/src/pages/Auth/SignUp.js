import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Typography, message } from 'antd';
import { Row, Col } from 'antd';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import SocialNetworks from './SocialNetworks';
import SignUpSuccessModal from './SignUpSuccessModal';
// import { authSignup } from '../../redux/actions/auth';
import { authSignup } from '../../redux';

const { Title } = Typography;

export default function SignUp() {
    const [checked, setChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state)
    console.log('STATE LOGIN', auth)

    
    const onFinish = async (values) => {
        const payload = {
            first_name: get(values, 'firstName'),
            last_name: get(values, 'lastName'),
            email: get(values, 'email'),
            username: get(values, 'username'),
            password: get(values, 'password'),
            // password2: get(values, 'password'),
            password2: get(values, 'confirm')
        }
        console.log('SIGNUP PAYLOAD', payload)

        setLoading(true)

        dispatch(authSignup(payload))

        setShowModal(true);
        form.resetFields()
        setLoading(false)
        setChecked(false)
        // navigate('/')

    };

    const onCheckboxChange = e => {
        setChecked(e.target.checked);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const validation = (rule, value) => {
        if (checked) {
            return Promise.resolve();
        }
        return Promise.reject(
            "Please agree Terms of Use & Privacy policy"
            );
        
    };

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
            {showModal && <SignUpSuccessModal
                handleClose={handleCloseModal}
            />}

            <Form
                name="signup"
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            // style={{
            //     height: '100vh', 
            //     padding: 2, 
            //     marginBottom: 0,
            //     height: 0
            //   }}
                style={{padding: 20}}

            >

                <Title level={2} className="text-center">Create Account</Title>
                <SocialNetworks />

                <div className="option-text">or use your email for registration</div>

                <Row gutter={{ xs: 8, sm: 16 }}>
                    <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
                        <Form.Item
                            hasFeedback
                            name="firstName"
                            // label="First name"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your first name.',
                                },
                                {
                                    min: 2,
                                    message: 'Your first name must be at least 2 characters.'
                                }]}>
                            <Input placeholder='First name' size="large" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
                        <Form.Item
                            hasFeedback
                            name="lastName"
                            // label="Last name"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your last name.',
                                },
                                {
                                    min: 2,
                                    message: 'Your last name must be at least 2 characters.'
                                }]}>

                            <Input placeholder='Last name' size="large" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="username"
                    // label="Username"
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
                    name="email"
                    // label="Email address"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    hasFeedback
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
                    <Input placeholder='Email' size="large" />
                </Form.Item>

                <Row gutter={{ xs: 8, sm: 16 }}>
                    <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
                        <Form.Item
                            name="password"
                            // label="Password"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password.',
                                },
                                { min: 6, message: 'Password must be minimum 6 characters.' },
                            ]}
                        >
                            <Input.Password placeholder='Password' size="large" />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
                        <Form.Item
                            name="confirm"
                            // label="Confirm Password"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Confirm your password.',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder='Confirm password' size="large" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Form.Item name="agree" valuePropName='checked' noStyle rules={[{ validator: validation }]}>
                        <Checkbox checked={checked} onChange={onCheckboxChange}>
                            I agree to <a href="#">Terms of Use & Privacy policy</a>.
                        </Checkbox>
                    </Form.Item>
                </Form.Item>

                <Button
                    // loading={loading}
                    loading={auth.loading}
                    type="primary"
                    className="form-submit-btn"
                    htmlType="submit"
                    shape="round"
                    icon={<UserAddOutlined />}
                    size="large"
                >
                    Sign Up
                </Button>
            </Form>
        </>
    )
}
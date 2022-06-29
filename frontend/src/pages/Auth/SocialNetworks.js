import React from 'react';
import { FacebookOutlined, GooglePlusOutlined, LinkedinOutlined, AmazonOutlined, AppleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux';

// import { actionSignInSuccess } from '../../redux/actions/auth';
import { actionSignInSuccess } from '../../redux';
// import config from '../../api/config'
import api from '../../api/axios';

const SocialNetworks = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const responseGoogle = async res => {
        try {
            const googleSignIn = await api({
                url: '/users/auth/google',
                data: {
                    access_token: res.accessToken
                },
                method: 'POST'
            })

            if (googleSignIn.status === 200 || googleSignIn.status === 201) {
                const accessToken = res.headers.authorization;
                const { user } = res.data
                user.accessToken = accessToken
                // update user profile redux and persist
                dispatch(actionSignInSuccess(user))
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    // const responseFacebook = res => {
    //     console.log(res)
    // }

    return (
        <div className="social-container">
            {/* <GoogleLogin
                // clientId={config.socials.GOOGLE_CLIENT_ID}
                render={renderProps => (
                    <Tooltip
                        title="Google+"
                        placement="bottom"
                        color="#db4a39"
                        key="#db4a39">
                            <div
                                className="social google"
                                // onClick={renderProps.onClick}
                            >
                                <GooglePlusOutlined />
                            </div>
                    </Tooltip>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            /> */}

            <Tooltip
                title="Google+"
                placement="bottom"
                color="#db4a39"
                key="#db4a39">
                <div
                    className="social google"
                // onClick={renderProps.onClick}
                >
                    <GooglePlusOutlined />
                </div>
            </Tooltip>

            <Tooltip
                title="Facebook"
                placement="bottom"
                color="#4267B2"
                key="#4267B2"
            >
                <div className="social facebook"><FacebookOutlined /></div>
            </Tooltip>

            <Tooltip title="LinkedIn" placement="bottom" color="#0e76a8" key="#0e76a8">
                <div className="social linkedin"><LinkedinOutlined />
                </div>
            </Tooltip>

            <Tooltip
                title="Amazon"
                placement="bottom"
                color="#4267B2"
                key="#4267B3"
            >
                <div className="social amazon"><AmazonOutlined /></div>
            </Tooltip>

            <Tooltip title="Apple" placement="bottom" color="#0e76a8" key="#0e76a9">
                <div className="social apple"><AppleOutlined />
                </div>
            </Tooltip>

        </div>
    )
}

export default React.memo(SocialNetworks)
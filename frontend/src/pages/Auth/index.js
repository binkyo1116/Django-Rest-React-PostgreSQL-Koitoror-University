import React, { useContext } from 'react';
import { Button } from 'antd';
import { SelectOutlined } from '@ant-design/icons';
import { Helmet } from "react-helmet";
import { useMediaQuery } from 'react-responsive'
// import MediaQuery from 'react-responsive'
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Typography } from 'antd';
import './style.css';
import AuthContext from '../../context/AuthContext';
import FooterComponent from '../../components/Footer'


const { Link } = Typography;


export default function Auth() {

    let {handleClickSignIn, handleClickSignUp, isPanelRightActive, switchMode } = useContext(AuthContext)

    // const isTabletOrDesktop = useMediaQuery({ minWidth: 768 })
    // const isTabletOrDesktop = useMediaQuery({ query: '(max-width: 1224px)' })
    // const isTabletOrDesktop = useMediaQuery({ maxWidth: 1224 })
    // const isTabletOrDesktop = useMediaQuery({ query: '(orientation: portrait)' })

    const isTabletOrDesktop = true

    return (
            <div className="auth-page" style={{padding: 0}}
            >
                <Helmet>
                    <title>K.U.-SignUp Or SignIn</title>
                    <meta name="description" content="React App authentication" />
                </Helmet>

                {/* {isTabletOrDesktop ? <div className="auth-page-wrapper" style={{padding: 0, height: 0}}> */}
                {isTabletOrDesktop ? <div className="auth-page-wrapper" >
                    <div className={`auth-container ${isPanelRightActive ? 'right-panel-active' : ''}`}>
                        {/* <div className="form-container sign-up-container" style={{padding: 0, height: 100}}> */}
                        <div className="form-container sign-up-container" >
                            <SignUp />
                        </div>
                        {/* <div className="form-container sign-in-container" style={{padding: 0, height: 100}}> */}
                        <div className="form-container sign-in-container" >
                            <SignIn />
                        </div>

                        <div className="overlay-container" style={{margin: 0, padding: 0}}>
                            <div className="overlay">
                                <div className="overlay-panel overlay-left bg-gradient">
                                    <h1>Welcome!</h1>
                                    <p>If you already have an account with us let's sign in to see something awesome!</p>
                                    <Button shape="round" onClick={handleClickSignIn} icon={<SelectOutlined />} size="large">
                                        Use your exist account
                                    </Button>
                                </div>
                                <div className="overlay-panel overlay-right bg-gradient">
                                    <h1>Hello, Friend!</h1>
                                    <p>If you don't have an account, let's enter your personal details and start journey with us</p>
                                    <Button shape="round" onClick={handleClickSignUp} icon={<SelectOutlined />} size="large">
                                        Create new account
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <div className="mobile-auth-wrapper">
                    {!isPanelRightActive ? <>
                        <SignIn />
                        <div className="text-center" onClick={switchMode}>Don't have an account? <Link>Sign up now.</Link></div>
                    </> : <>
                        <SignUp />
                        <div className="text-center" onClick={switchMode}>Already have an account? <Link>Sign in now.</Link></div>
                    </>}
                </div>}
                
                <FooterComponent />

            </div>
    )
}

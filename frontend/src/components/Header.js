import React, { useEffect } from 'react'
// import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { Breadcrumb, Button } from "antd";
import { HomeOutlined, UserOutlined, LogoutOutlined, LoginOutlined, FileAddFilled } from '@ant-design/icons';
import { Layout } from "antd";
const { Header } = Layout;

// import * as actions from "../redux/actions/auth";
import { logout as logoutAction } from "../redux";
// import AuthContext from '../context/AuthContext'

const HeaderComponent = (props) => {
// const HeaderComponent = useNavigate((props) => {
    // let { user, logoutUser } = useContext(AuthContext)

    const navigate = useNavigate();

    console.log('PROPS HeaderComponent ----> ', props)

    // REDIRECT TO HOMEPAGE ON LOGOUT FROM LAYOUT
    useEffect(() => {
    if (!props.isAuthenticated) {
        navigate('/');
        }
    
    }, [props]);

    const hooksData = useSelector(state => {
        // console.log(state)
        return {
        token: state.auth.token,
        userId: state.auth.userId,
        // userId: state.auth.profile.user_id,
        is_teacher: state.auth.profile.is_teacher
        };
    });

    // console.log(hooksData)

    const dispatch = useDispatch()

    function logout() {
        console.log('ACTION TO LOGOUT DISPATCHED')
        // return dispatch(actions.logout())
        return dispatch(logoutAction())
    };
    return (
        <Header>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>
                    <HomeOutlined />
                    <Link to="/">Home</Link>
                </Breadcrumb.Item>
                {/* {hooksData.token !== (null || undefined) ? ( */}
                {hooksData.token !== null ? (
                    <Breadcrumb.Item>
                        <UserOutlined />
                        <Link to={`/profile/${hooksData.userId}`}>Profile</Link>
                    </Breadcrumb.Item>
                ) : null}
                {hooksData.token !== null && hooksData.is_teacher ? (
                    <Breadcrumb.Item>
                        <FileAddFilled />
                        <Link to="/create">Create</Link>
                    </Breadcrumb.Item>
                ) : null}
            </Breadcrumb>
            <Breadcrumb
                style={{
                    margin: -42,
                    float: 'right'
                }}
            >
                {props.isAuthenticated ? (
                    <Breadcrumb.Item>
                        <Button
                            key="2"
                            icon={<LogoutOutlined />}
                            onClick={logout}
                            style={{ borderRadius: 10 }}
                        >
                            Logout
                        </Button>
                    </Breadcrumb.Item>

                ) : (
                    <Breadcrumb.Item>
                        <Link to="/login" >
                            <Button key="1"
                                icon={<LoginOutlined />}
                                style={{ borderRadius: 10 }}
                            >

                                Login

                            </Button>
                        </Link>
                    </Breadcrumb.Item>
                )}
            </Breadcrumb>
        </Header>

        // <div>
        //     <Link to="/" >Home</Link>
        //     <span> | </span>
        //     {user ? (
        //          <p  onClick={logoutUser}>Logout</p>
        //     ): (
        //         <Link to="/login" >Login</Link>
        //     )}
       
        //     {user && <p>Hello {user.username}</p>}
            
        // </div>
    )
// })
}

export default HeaderComponent

import React, { createContext, useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'

const AuthContext = createContext();

// Backend API URL
import { API_HOST as uri } from '../api/fetch/api';

export default AuthContext

export const AuthContextProvider = ({ children }) => {

    const [isPanelRightActive, setIsPanelRightActive] = useState(false);

    let [loading, setLoading] = useState(true)

    const handleClickSignIn = () => {
        setIsPanelRightActive(false)
    }

    const handleClickSignUp = () => {
        setIsPanelRightActive(true)
    }

    const switchMode = () => {
        setIsPanelRightActive(!isPanelRightActive)
    }

    let [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens')
            ? JSON.parse(localStorage.getItem('authTokens'))
            : null,
    )

    // let [authTokens, setAuthTokens] = useState(
    //     localStorage.getItem('authTokens')
    //         ? JSON.parse(localStorage.getItem('authTokens'))
    //         : null,
    // )

    console.log('authTokens', authTokens)

    // let [user, setUser] = useState(() =>
    //     localStorage.getItem('authTokens')
    //         ? jwt_decode(localStorage.getItem('authTokens'))
    //         : null,
    // )

    
    let [user, setUser] = useState(
            localStorage.getItem('authTokens')
                ? jwt_decode(localStorage.getItem('authTokens'))
                : null,
        )

    console.log('user', user)


    // let loginUser = async (e) => {
    //     e.preventDefault()

    //     let response = await fetch(`${uri}/api/token/`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             username: e.target.username.value,
    //             password: e.target.password.value,
    //         }),
    //     })
    //     console.log('RESPONSE', response)
    //     let data = await response.json()

    //     if (response.status === 200) {
    //         setAuthTokens(data)
    //         setUser(jwt_decode(data.access))
    //         localStorage.setItem('authTokens', JSON.stringify(data))
    //     } else {
    //         alert('Something went wrong!')
    //     }
    // }

    // let logoutUser = () => {
    //     setAuthTokens(null)
    //     setUser(null)
    //     localStorage.removeItem('authTokens')
    // }

    let updateToken = async () => {
        // console.log('updated token!')
        // let response = await fetch(`${uri}/api/token/refresh/`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ 'refresh': authTokens?.refresh })
        //     // body: JSON.stringify({ refresh: authTokens && authTokens.refresh }),
        // })

        // let data = await response.json()

        // if (response.status === 200) {
        //     setAuthTokens(data)
        //     setUser(jwt_decode(data.access))
        //     localStorage.setItem('authTokens', JSON.stringify(data))
        // } 
        // else {
        //     logoutUser()
        // }

        if (loading) {
            setLoading(false)
        }
    }

    let contextData = {
        user,
        authTokens,
        // loginUser,
        // logoutUser,
        handleClickSignIn,
        handleClickSignUp,
        switchMode,
        setIsPanelRightActive,
        isPanelRightActive
    }

    useEffect(() => {
        if (loading) {
            updateToken()
        }

        let twentyNineMinutes = 1000 * 60 * 29

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, twentyNineMinutes)
        return () => clearInterval(interval)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}

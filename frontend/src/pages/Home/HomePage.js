import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../context/AuthContext'

const HomePage = () => {
    let [notes, setNotes] = useState([])
    let { authTokens, logoutUser } = useContext(AuthContext)
    // let { logoutUser } = useContext(AuthContext)
    // console.log(authTokens.access)
    const tokens = authTokens
    // const tokens = JSON.parse(localStorage.getItem("authTokens"));
    let authorization = `Bearer ${tokens.access}`;
    console.log(authorization)

    useEffect(()=> {
        getNotes()
    }, [])


    let getNotes = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/notes/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                // 'Authorization': authorization,
                // 'Authorization': `Bearer ${authTokens.access}`
                // 'Authorization':'Bearer ' + String(authTokens.access)
                // 'Authorization':'Bearer ' + authTokens.access
            }
        })
        let data = await response.json()

        if(response.status === 200){
            console.log(data)
            setNotes(data)
        }else if(response.statusText === 'Unauthorized'){
            console.log(data)
            logoutUser()
        }
        
    }

    return (
        <div>
            <p>You are logged to the home page!</p>


            <ul>
                {notes.map(note => (
                    <li key={note.id} >{note.body}</li>
                ))}
            </ul>
        </div>
    )
}

export default HomePage

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate()

    const [username, setusername] = useState()


    useEffect(() => {
        setusername(localStorage.getItem('username'))
        if (!username) {
            localStorage.setItem('username', Math.floor(Math.random() * 10000))
        }
    }, [username])


    return (
        <div>
            <button onClick={() => { navigate('/play') }}>Play</button>
            <button onClick={() => { navigate('/chat') }}>Chat</button>
        </div>
    )
}

export { Dashboard }
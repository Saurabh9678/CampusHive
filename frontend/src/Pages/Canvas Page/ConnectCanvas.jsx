import React, { useState, useEffect } from 'react'
import { ToastContainer } from "react-toastify";
import Sidebar from '../../components/Sidebar';
import Room from '../../components/Room';
import ClientRoom from '../../components/ClientRoom';
import JoinCreateRoom from '../../components/JoinCreateRoom';
import "./ConnectCanvas.css"
import VoiceChannel from '../../components/VoiceChannel/VoiceChannel';

const ConnectCanvas = ({ socket }) => {

  const [userNo, setUserNo] = useState(0);
  const [roomJoined, setRoomJoined] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const [loading, setloading] = useState(true)

  const username = localStorage.getItem('username')
  const token = localStorage.getItem('token')

  useEffect(() => {

    // setUser(username)

    setRoomJoined("0000")

  }, [])

  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  useEffect(() => {
    if (roomJoined) {
      socket.emit("user-joined", user);
    }
  }, [roomJoined, socket, user]);

  return (
    <div className="home">
      {/* <VoiceChannel token={token} username={username} roomId={roomJoined}/> */}
      <ToastContainer />
      {roomJoined ? (
        <>
          <Sidebar users={users} user={user} socket={socket} />
          {user.presenter ? (
            <Room
              userNo={userNo}
              user={user}
              socket={socket}
              setUsers={setUsers}
              setUserNo={setUserNo}
            />
          ) : (
            <ClientRoom
              userNo={userNo}
              user={user}
              socket={socket}
              setUsers={setUsers}
              setUserNo={setUserNo}
            />
          )}
        </>
      ) : (
        <JoinCreateRoom
          uuid={uuid}
          setRoomJoined={setRoomJoined}
          setUser={setUser}
        />
      )}
    </div>
  );
}

export default ConnectCanvas
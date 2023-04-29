import React, { useState, useEffect } from 'react'
import { ToastContainer } from "react-toastify";
import Sidebar from '../../components/Sidebar';
import Room from '../../components/Room';
import ClientRoom from '../../components/ClientRoom';
import JoinCreateRoom from '../../components/JoinCreateRoom';
import "./ConnectCanvas.css"
import VoiceChannel from '../../components/VoiceChannel/VoiceChannel';
import { API, PATH } from '../../common/network';
import Loading from '../../components/Loading/Loading';

const ConnectCanvas = ({ socket }) => {

  const [userNo, setUserNo] = useState(0);
  const [roomJoined, setRoomJoined] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const [loading, setloading] = useState(true)

  const [username, setusername] = useState()
  const [userId, setuserId] = useState()
  const [token, settoken] = useState()

  const [roomId, setroomId] = useState()
  const [members, setmembers] = useState()

  const [isVoiceMute, setisVoiceMute] = useState(false)


  //game logic

  const [isGameStarted, setisGameStarted] = useState(true)

  const [isPresenter, setisPresenter] = useState(false)

  const [waiting, setwaiting] = useState(true)

  useEffect(() => {

    const uid = JSON.parse(localStorage.getItem('user'))._id

    setuserId(uid)

    console.log(uid)

    settoken(localStorage.getItem('token'))
    setusername(localStorage.getItem('username'))

    API.post(PATH.Room.GetRoom, { userId: uid }).then((res) => {

      setroomId(res.roomID)
      setmembers(res.members)

      if (res.members.length > 1) {
        setwaiting(false)
      }

      if (res.members.length == 1) {
        setisPresenter(true)
      }

      setloading(false)

    })

  }, [])


  useEffect(() => {
    setUser({
      roomId: roomId,
      userId: userId,
      userName: username,
      host: false,
      presenter: isPresenter,
    });
    setRoomJoined(true);
  }, [isPresenter])


  // useEffect(() => {
  //   const handleTabClose = event => {
  //     event.preventDefault();
  //     API.post(PATH.Room.LeaveRoom, { userId: userId, roomId: roomId }).then(res => console.log(res))
  //   };
  //   window.addEventListener('beforeunload', handleTabClose);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleTabClose);
  //   };
  // }, []);

  useEffect(() => {
    const handleTabClose = event => {
      event.preventDefault();
      leaveRoom()
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    }
  }, [])


  const leaveRoom = () => {
    if (roomId) {
      API.post(PATH.Room.LeaveRoom, { userId: userId, roomId: roomId }).then(res => console.log(res))
    }
  }


  // const uuid = () => {
  //   var S4 = () => {
  //     return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  //   };
  //   return (
  //     S4() +
  //     S4() +
  //     "-" +
  //     S4() +
  //     "-" +
  //     S4() +
  //     "-" +
  //     S4() +
  //     "-" +
  //     S4() +
  //     S4() +
  //     S4()
  //   );
  // };

  useEffect(() => {
    if (roomJoined) {
      socket.emit("user-joined", user);
    }
  }, [roomJoined, socket, user]);

  if (loading) {
    return <Loading />
  }
  else {
    return (
      <div className="home">
        <VoiceChannel token={token} isMute={isVoiceMute} username={username} roomId={roomId} />
        <button  className ="LeaveRoombtn" onClick={() => leaveRoom()}>Leave Room</button>
        <button  className="mutebtn" Click={() => setisVoiceMute(!isVoiceMute)}>Mute</button>
        <ToastContainer />
        {isGameStarted ? (
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
          <>
            Lobby
          </>
        )}
      </div>
    );
  }


}

export default ConnectCanvas
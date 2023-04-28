import React, { useEffect, useState } from 'react'
import Chat from '../Chat Page/Chat';
import './JoinChat.css';
import ButtonChat from './ButtonChat';
import { useNavigate } from 'react-router-dom';
import { API, PATH } from '../../common/network';
import Loading from '../../components/Loading/Loading';

function JoinChat({ socket }) {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const [allTags, setallTags] = useState(null)

  const [loading, setloading] = useState(true)

  const joinRoom = (tag) => {
    if (username !== "" && tag !== "") {
      socket.emit("join_room", tag);
      setRoom(tag)
      setShowChat(true);
    }
  };


  useEffect(() => {
    const uname = localStorage.getItem('username')

    if (!uname) {
      navigate(`/register`)
    }
    else {
      setUsername(uname)
    }

    API.get(PATH.Chat.GetTags).then((res) => {
      setallTags(res.tags)
      setloading(false)
    }).catch((e) => {
      console.log(e)
      setloading(false)
    })


  }, [])


  if (loading) {
    <div><Loading/></div>
  }
  else {
    return (
      <div className="App">

        {!showChat ? <div className="joinChatContainer"><h1 className="HJ">Join Room</h1>
          <h1 className="h22">Hi 🖐️ how are you ?</h1>
          <h2 className="HLL">As an introvert myself, I know how hard it can be to initiate a conversation. But let's give it a shot and chat about life, the universe, and everything in between. Who knows what amazing insights we might gain?</h2>
          {
            allTags.map((tag, index) => {
              return <ButtonChat onClick={()=>joinRoom(tag)} key={index}>{tag}</ButtonChat>
            })
          }

        </div>
          :
          <Chat socket={socket} username={username} room={room}></Chat>
        }
      </div>
    );
  }
}

export default JoinChat
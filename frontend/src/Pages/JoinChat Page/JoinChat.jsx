import React, {useState} from 'react'
import Chat from '../Chat Page/Chat';
import './JoinChat.css';

function JoinChat({socket}) {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const joinRoom = () => {
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
        setShowChat(true);
      }
    };
    return (
      <div className="App">
        {!showChat ? (
          <div className="joinChatContainer">
            <h2>Join Room</h2>
            <input
              type="text"
              placeholder="John..."
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room ID..."
              value={room}
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
            <button onClick={joinRoom}>Join</button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room}></Chat>
        )}
      </div>
    );
}

export default JoinChat
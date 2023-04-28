import React, { useState } from 'react';
import '../Style/Chatbox.css';

const RoomBox = () => {
  const [numPeople, setNumPeople] = useState(0);

  return (
    <div className="room-box">
      <div className="room-info">
        <p className="room-name">Room Name</p>
        <p className="num-people">{numPeople} people</p>
      </div>
      <div className="join-button">
        <button>Join Room</button>
      </div>
    </div>
  );
};

export default RoomBox;
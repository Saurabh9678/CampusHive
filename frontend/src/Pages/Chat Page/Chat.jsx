import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import './Chat.css';
import { API, PATH } from "../../common/network";
import Loading from "../../components/Loading/Loading";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const [loading, setloading] = useState(true)

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const timestamp = new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes()
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: timestamp
      };

      const user = JSON.parse(localStorage.getItem('user'))

      const postData = {
        tag: room,
        messageData: {
          message: currentMessage,
          user: user._id,
        },
      };

      API.post(PATH.Chat.SaveMessage, postData)

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };


  useEffect(() => {
    API.get(PATH.Chat.GetMessagesByTags(room)).then((res) => {
      setMessageList([])
      res.messages.map((m) => {
        const { message, timestamp, user } = m

        let hour = new Date(Date.parse(timestamp)).getHours()
        let min = new Date(Date.parse(timestamp)).getMinutes()

        const structuredMessage = {
          room: room,
          author: user.username,
          message: message,
          time: hour+":"+min
        }
        setMessageList((list) => [...list, structuredMessage])
      })
      setloading(false)
      // setMessageList((list) => [...list, messageData]);
    }).catch((e) => {
      console.log(e)
    })
  }, [])


  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);


  if (loading) {
    <div><Loading/></div>
  }
  else {
    return (
      <div className="chat-window">
        <div className="chat-header">
          <p className="Titlechat">{room}</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">

            {messageList.map((messageContent) => {
              return (
                <>
                  <div
                    className="message"
                    id={username === messageContent.author ? "you" : "other"}
                  >
                    <div>
                      <div className="message-content">
                        <p>{messageContent.message}</p>
                      </div>
                      <div className="message-meta">
                        <p id="time">{messageContent.time}</p>
                        <p id="author">{messageContent.author}</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    );
  }
}

export default Chat;
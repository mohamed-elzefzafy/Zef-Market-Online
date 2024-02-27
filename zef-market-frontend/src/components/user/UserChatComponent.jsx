import { useEffect, useState } from "react";
import "../../chat.css";
import { serverUrl } from "../../utils/serverUrl";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
const socket = socketIOClient(serverUrl, { transports: ["websocket"] });


const UserChatComponent = () => {

const [socketState, setSocketState] = useState(false);
const [chat, setChat] = useState([]);
const [messageRecived, setMessageRecived] = useState(false);
const {userInfo} = useSelector(state => state.userRegisterLogin);
const [chatConnectionInfo, setchatConnectionInfo] = useState(false);
const [reconnect, setReconnect] = useState(false);


useEffect(() => {
  if (!userInfo?.isAdmin) {
    setReconnect(false);
var audio = new Audio("/audio/chat-msg.mp3");
socket.on("admin not found" , () => {
  setChat((chat) => {
    return [...chat , {admin : "no admin avaliable now"}]
   })
})


    socket.on("server sends message from admin to client" , (msg) => {
      setChat((chat) => {
        return [...chat , {admin : msg}]
       })
       setMessageRecived(true);
       audio.play();
       setTimeout(() => {
        const chatMessage = document.querySelector(".chat-msg");
       chatMessage.scrollTop = chatMessage.scrollHeight;
       }, 100);
    })
        setSocketState(socket);
        socket.on("admin closed chat" , () => {
          setChat([]);
          setchatConnectionInfo("admin closed chat type something and submit to reconnect");
          setReconnect(true);
        })
    // return () => socket.disconnect();
  }

},[userInfo?.isAdmin , reconnect])


const clientSubmitChatMessage = (e) => {
  if (e.keyCode && e.keyCode !== 13) {
    return;
}
setchatConnectionInfo("");
setMessageRecived(false);
const msg = document.getElementById("clientChatMsg");
let v = msg?.value?.trim();
   socketState.emit("client sends message" , v)
   setChat((chat) => {
    return [...chat , {client : v}]
   })
   msg.focus();
   setTimeout(() => {
    msg.value = "";
    const chatMessage = document.querySelector(".chat-msg");
    chatMessage.scrollTop = chatMessage.scrollHeight;
   }, 200);
  
}

  return !userInfo?.isAdmin ?(
    <>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="chat-btn">
        <i className="bi bi-chat-dots comment"></i>
      {
        messageRecived && 
        <span className="position-absolute top-0 start-10 translate-middle p-2
         bg-danger border border-light rounded-circle"></span>
      }
        <i className="bi bi-x-circle close"></i>
      </label>

      <div className="chat-wrabber">
        <div className="chat-header">
          <h6>Let's chat online</h6>
        </div>
        <div className="chat-form">
          <div className="chat-msg">
          <p>{chatConnectionInfo}</p>
          {chat?.map((item , id) => 
          
          <div key={id}>
      {item.client &&
        <p>
              <b>You wrote:</b> {item?.client}
            </p>
      }
        {item.admin  &&
          <p className="bg-primary p-3 ms-4 text-light rounded-pill">
              <b>Support wrote : </b>{item.admin} 
            </p>
        }
          </div>)}
          </div>
          <textarea
          onKeyUp={(e) => clientSubmitChatMessage(e)}
            id="clientChatMsg"
            className="form-control mt-2"
            placeholder="Your Text Message"
          ></textarea>

          <button onClick={(e) => clientSubmitChatMessage(e)} className="btn btn-success btn-block">Submit</button>
        </div>
      </div>
    </>
  ) : null;
};

export default UserChatComponent;

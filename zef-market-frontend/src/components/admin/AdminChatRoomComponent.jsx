import { Fragment, useEffect, useState } from "react";
import { Button, Form, Toast, ToastBody, ToastHeader } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { messageRecivedAction } from "../../redux/actions/chatActions";


const AdminChatRoomComponent = ({chatRoom , roomIndex , socketUser , socket}) => {
  const dispatch = useDispatch();
[window["toast" + roomIndex] , window["closeToast" + roomIndex]] = useState(true);
const [render, setRender] = useState(false);

const close = (socketId) => {
  window["closeToast" + roomIndex](false);
  socket.emit("Admin closes chat" , socketId)
}


const adminSubmitChatMsg = (e , elem) => {
e.preventDefault();
if (e.keyCode && e.keyCode !== 13) {
  return;
}
const msg = document.getElementById(elem);
let v =msg?.value?.trim();
if (v === "" || v === null || v === false || !v) {
  return;
}
chatRoom[1].push({admin : msg.value})
socket.emit("Admin sends message" ,  {
  user : socketUser,
message : v
} )
setRender(!render);
msg.focus();
dispatch(messageRecivedAction(false))
setTimeout(() => {
  msg.value = "";
const chatMessage = document.querySelector(`.chat-msg${socketUser}`)
if (chatMessage) chatMessage.scrollTop = chatMessage.scrollHeight
}, 200);
}

useEffect(()=>{
  const chatMessage = document.querySelector(`.chat-msg${socketUser}`)
if (chatMessage) chatMessage.scrollTop = chatMessage.scrollHeight
})
  return (
  <>
    <Toast show={"toast" + roomIndex}
     onClose={() => close(chatRoom[0])} className="ms-4 mb-5" style={{height : "fit-content"}}>
      <ToastHeader>
        <strong className="me-auto">Chat with : user</strong>
      </ToastHeader>
      <ToastBody>
<div className={`chat-msg${socketUser}`} style={{overflow : "auto" , maxHeight : "300px"}}>
{chatRoom[1].map((message ,index) =>
  <Fragment key={index}>
  {message?.client &&
    <p className="bg-primary text-light p-3 ms-4 rounded-pill">
      <b>user wrote : </b>{message?.client}
      </p>
  }
  
{message?.admin && 
  <p className="p-3  rounded-pill">
      <b>Admin wrote : </b> {message?.admin}
      </p>
}
    
  </Fragment>
  )}
</div>

<Form>
    <Form.Group className="mb-3" controlId={`adminChatMsg${roomIndex}`} >
    <Form.Label>Write A message</Form.Label>
    <Form.Control onKeyUp={(e) => adminSubmitChatMsg(e ,`adminChatMsg${roomIndex}` )} as="textarea" rows={2}/>
  
    </Form.Group>
</Form>
  <Button onClick={(e) => adminSubmitChatMsg(e , `adminChatMsg${roomIndex}` )} variant="success">Submit</Button>
      </ToastBody>
    </Toast>

  </>
  )
}

export default AdminChatRoomComponent;
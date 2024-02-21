import { Fragment, useState } from "react";
import { Button, Form, Toast, ToastBody, ToastHeader } from "react-bootstrap";


const AdminChatRoomComponent = ({chatRoom}) => {
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);

  const toggleShowA = () => setShow1(false);
  const toggleShowB = () => setShow2(false);

  console.log(chatRoom);
  return (
  <>
    <Toast show={show1} onClose={toggleShowA} className="ms-4 mb-5" style={{height : "fit-content"}}>
      <ToastHeader>
        <strong className="me-auto">Chat with john doe</strong>
      </ToastHeader>
      <ToastBody>
<div style={{overflow : "auto" , maxHeight : "300px"}}>
{Array.from({length : 30}).map((_,index) =>
  <Fragment key={index}>
  <p className="bg-primary text-light p-3 ms-4 rounded-pill">
      <b>user wrote : </b> hwllo world this is achat  message
      </p>

      <p className="p-3  rounded-pill">
      <b>Admin wrote : </b> hello world this is achat  message
      </p>
  </Fragment>
  )}
</div>

<Form>
    <Form.Group className="mb-3" controlId="exampleForm.controlTextArea" >
    <Form.Label>Write A message</Form.Label>
    <Form.Control as="textarea" rows={2}/>
  
    </Form.Group>
</Form>
  <Button variant="success">Submit</Button>
      </ToastBody>
    </Toast>

    <Toast show={show2} onClose={toggleShowB} className="ms-4 mb-5" style={{height : "fit-content"}}>
      <ToastHeader>
        <strong className="me-auto">Chat with john doe</strong>
      </ToastHeader>
      <ToastBody>
<div style={{overflow : "auto" , maxHeight : "300px"}}>
{Array.from({length : 30}).map((_,index) =>
  <Fragment key={index}>
  <p className="bg-primary text-light p-3 ms-4 rounded-pill">
      <b>user wrote : </b> hwllo world this is achat  message
      </p>

      <p className="p-3  rounded-pill">
      <b>Admin wrote : </b> hello world this is achat  message
      </p>
  </Fragment>
  )}
</div>

<Form>
    <Form.Group className="mb-3" controlId="exampleForm.controlTextArea" >
    <Form.Label>Write A message</Form.Label>
    <Form.Control as="textarea" rows={2}/>
  
    </Form.Group>
</Form>
  <Button variant="success">Submit</Button>
      </ToastBody>
    </Toast>
  </>
  )
}

export default AdminChatRoomComponent;
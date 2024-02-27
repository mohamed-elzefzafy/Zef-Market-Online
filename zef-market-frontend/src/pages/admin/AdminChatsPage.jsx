import { Col, Row } from "react-bootstrap";
import AdminLinksComponent from './../../components/admin/AdminLinksComponent';
import AdminChatRoomComponent from "../../components/admin/AdminChatRoomComponent";
import { useSelector } from "react-redux";


const AdminChatsPage = () => {
  const {chatRooms , socket} = useSelector(state => state.chat);
  return (
    <Row className="mt-5 w-100">

      <Col md={2}>
        <AdminLinksComponent/>
      </Col>

      <Col md={10} className="d-flex flex-wrap">
    <Row>
        {Object.entries(chatRooms).map((chatRoom , index) => 
        <AdminChatRoomComponent key={index} 
        chatRoom={chatRoom} roomIndex={index + 1} socketUser={chatRoom[0]} socket={socket}/>
      )}

    </Row>
      </Col>

    </Row>
  )
}


export default AdminChatsPage;
import { Col, Row } from "react-bootstrap";
import AdminLinksComponent from './../../components/admin/AdminLinksComponent';
import AdminChatRoomComponent from "../../components/admin/AdminChatRoomComponent";
import { useSelector } from "react-redux";


const AdminChatsPage = () => {
  const {chatRooms} = useSelector(state => state.chat);
  console.log(chatRooms);
  return (
    <Row className="mt-5 w-100">

      <Col md={2}>
        <AdminLinksComponent/>
      </Col>

      <Col md={10} className="d-flex flex-wrap">
      {Object.entries(chatRooms).map((chatRoom , index) => 
        <AdminChatRoomComponent key={index} chatRoom={chatRoom}/>
      )}

      </Col>

    </Row>
  )
}

export default AdminChatsPage;
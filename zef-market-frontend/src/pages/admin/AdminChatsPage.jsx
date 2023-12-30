import { Col, Row } from "react-bootstrap";
import AdminLinksComponent from './../../components/admin/AdminLinksComponent';
import AdminChatRoomComponent from "../../components/admin/AdminChatRoomComponent";


const AdminChatsPage = () => {
  return (
    <Row className="mt-5 w-100">

      <Col md={2}>
        <AdminLinksComponent/>
      </Col>

      <Col md={10} className="d-flex flex-wrap">
<AdminChatRoomComponent/>
      </Col>

    </Row>
  )
}

export default AdminChatsPage;
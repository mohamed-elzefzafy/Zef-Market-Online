import { Button, Col, Row, Table } from "react-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { LinkContainer } from "react-router-bootstrap";


const AdminUsersPage = () => {

  const deleteHandler = () => {
    if (window.confirm("Are you sure ?")) alert("User Deleted")
  }
  return (
    <Row className="mt-5 w-100">
    <Col md={2}>
<AdminLinksComponent/>
    </Col>
    <Col md={10}>
  <h1>Users list</h1>
  <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Is Admin</th>
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
    
    {["bi bi-check-lg text-success" , "bi bi-x-lg text-danger"].map((item , index) => 
    <tr>
            <td>{index + 1}</td>
            <td>Mark </td>
            <td>twin</td>
            <td>email@email.com</td>
            <td> <i className={item}></i> </td>
            <td>
            <LinkContainer to="/admin/edit-user">
              <Button className="btn-sm">
                <i className="bi bi-pencil-square"></i>
              </Button>
            </LinkContainer>
            {" / "}
            <Button variant="danger" className="btn-sm" onClick={deleteHandler}>
              <i className="bi bi-trash"></i>
            </Button>
            </td>
          </tr>
    )}
  
        </tbody>
      </Table>
  
    </Col>
      </Row>
  )
}

export default AdminUsersPage;
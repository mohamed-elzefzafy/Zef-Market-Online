import { Button, Col, Image, Row, Table } from 'react-bootstrap'
import AdminLinksComponent from '../../../components/admin/AdminLinksComponent'
import { LinkContainer } from 'react-router-bootstrap'
import { useEffect, useState } from 'react';

const UserPageComponent =  ({fetchUsers , deleteUser}) => {
  
  const [users, setUsers] = useState([]);
  const [userDeleted, setUserDeleted] = useState(false);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure ?")) {
      const data = await  deleteUser(id);
      if (data === "user deleted") {
         setUserDeleted(!userDeleted);
      }
    }
   
  
  }

  useEffect(() => {
    // const abctrl = new AbortController();
  // fetchUsers(abctrl).then((users) => setUsers(users));
  fetchUsers().then((users) => setUsers(users)).catch((error) =>
  console.log(
    error.response.data.message ? error.response.data.message : error.response.data)
  );

  // return  abctrl.abort();
  } , [userDeleted])


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
            <th>Admin / user </th>
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
    
    {users?.map((user , index) => 
    <tr key={index}>
            <td>{index + 1}</td>
            <td> <Image width="30px" height="30px" className="rounded-circle me-3" src={user?.profilePhoto.url} alt="profilePhoto" /> {user?.name} </td>
            <td>{user?.lastName}</td>
            <td>{user?.email}</td>
            <td> <i className={user}></i> {user?.isAdmin ? "Admin" : "User"} </td>
            <td>
            <LinkContainer to={`/admin/edit-user/${user._id}`}>
              <Button className="btn-sm">
                <i className="bi bi-pencil-square"></i>
              </Button>
            </LinkContainer>
            {" / "}
            <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user?._id)}>
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

export default UserPageComponent
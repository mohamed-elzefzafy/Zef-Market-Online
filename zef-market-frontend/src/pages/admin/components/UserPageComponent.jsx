import { Button, Col, Image, Row, Table } from 'react-bootstrap'
import AdminLinksComponent from '../../../components/admin/AdminLinksComponent'
import { LinkContainer } from 'react-router-bootstrap'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToggleBlockUser, logOut } from '../../../redux/actions/userActions';

const UserPageComponent =  ({fetchUsers , deleteUser}) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [userDeleted, setUserDeleted] = useState(false);
  const [blockUserLoading, setblockUserLoading] = useState(false);

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
dispatch(logOut())
  );

  // return  abctrl.abort();
  } , [userDeleted , blockUserLoading])


const toggleBlockTheUser = async(id) => {
  setblockUserLoading(true);
await dispatch(ToggleBlockUser(id));
setblockUserLoading(false);
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
            <th>Admin / user </th>
            <th className='text-center'>Block / Delete</th>
          </tr>
        </thead>
        <tbody>
    
    {users?.map((user , index) => 
    <tr key={index}>
            <td>{index + 1}</td>
            <td> <Image width="30px" height="30px" className="rounded-circle me-3" src={user?.profilePhoto.url} alt="profilePhoto" /> {user?.name} </td>
            <td>{user?.lastName}</td>
            <td>{user?.email}</td>
            <td className={`${user?.isAdmin ? "text-danger fw-bold" : "text-dark"}`}> 
              {user?.isAdmin ? "Admin" : "User"} {" "} {user?.isBlocked ? "Blocked" : ""} </td>
            <td className='text-center'>
            {/* <LinkContainer to={`/admin/edit-user/${user._id}`}> */}
            {!user?.isAdmin ?
          <>
          <Button className="btn-sm"  onClick={() => toggleBlockTheUser(user._id)}>
          {user?.isBlocked ? <i className="bi bi-check-circle"></i> :  <i className="bi bi-ban"></i>}
              </Button>
              {" / "}
              <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user?._id)}>
              <i className="bi bi-trash"></i>
            </Button>
          </> : "ADMIN"
            }
            {/* </LinkContainer> */}
          
            
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
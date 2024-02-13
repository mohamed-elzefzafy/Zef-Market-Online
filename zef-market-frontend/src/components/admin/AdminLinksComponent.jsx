import { Nav, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logOut } from '../../redux/actions/userActions';

const AdminLinksComponent = () => {
  const dispatch = useDispatch();

  const logOutHandle = () => {
    dispatch(logOut());
  }
  return (
<Navbar bg='light' variant='light'>
<Nav className='flex-column'>

<LinkContainer to="/admin/orders">
<Nav.Link>
  Orders
  </Nav.Link>
</LinkContainer>
<LinkContainer to="/admin/products">
<Nav.Link>
  Products
  </Nav.Link>
</LinkContainer>
<LinkContainer to="/admin/users">
<Nav.Link>
  UserList
  </Nav.Link>
</LinkContainer>
<LinkContainer to="/admin/chats">
<Nav.Link>
  Chats
  </Nav.Link>
</LinkContainer>
<LinkContainer to="/admin/analytics">
<Nav.Link>
  Analyitcs
  </Nav.Link>
</LinkContainer>

<LinkContainer to="/admin/UpdateProfilePhoto">
<Nav.Link>
Change Admin Profile Photo
  </Nav.Link>
</LinkContainer>

<LinkContainer to="/admin/createcategory">
<Nav.Link>
create Category
  </Nav.Link>
</LinkContainer>
<Nav.Link onClick={logOutHandle}>Logout</Nav.Link>
</Nav>
</Navbar>
  )
}

export default AdminLinksComponent;


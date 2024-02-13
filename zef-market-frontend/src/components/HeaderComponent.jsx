import { Badge, Button, Container, Dropdown, DropdownButton, Form, Image, InputGroup, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { logOut } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../redux/actions/categoryActions";


const HeaderComponent = () => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.userRegisterLogin);
  const {cartItems} = useSelector(state => state.cart);


  useEffect(()=> {
    dispatch(getCategories());
  },[dispatch])

  const logOutHandle = async() => {
  await  dispatch(logOut());
  }
  return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" >
          <Container>
          <LinkContainer to="/">
          <Navbar.Brand href="/" className="text-info">Zef-Market</Navbar.Brand>
          </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="mb-2"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
              <InputGroup>
              <DropdownButton id="dropdown-basic-button" title="All">
               <Dropdown.Item>Electronics</Dropdown.Item>
               <Dropdown.Item>Cars</Dropdown.Item>
               <Dropdown.Item>Books</Dropdown.Item>
              </DropdownButton>
              <Form.Control type="text" placeholder="search on zef-market" />
              <Button variant="warning">
              <i className="bi bi-search text-dark"></i>
              </Button>
              </InputGroup>
              </Nav>

              <Nav className="d-flex justify-content-md-start align-items-md-center">

 {userInfo?.isAdmin ? 
 //admin
 (
  <>
  <Link to="/admin/orders" >
 <Image width="40px" height="40px"  src={userInfo?.profilePhoto?.url} roundedCircle className="mt-2"/>
 </Link>
  <LinkContainer to="/admin/orders">
              <Nav.Link>
              Admin : {`${userInfo?.name} ${userInfo?.lastName}`}
              <span className="position-absolute top-1 start-10 translate-middle
              p-2 bg-danger border border-light rounded-circle"></span>
              </Nav.Link>
              </LinkContainer>
  </>

 ) :
  (userInfo?.name && !userInfo?.isAdmin ? 
  //regular user
  (
 <>
 <Link to="/user">
 <Image width="40px" height="40px"  src={userInfo?.profilePhoto?.url} roundedCircle className="mt-2"/>
 </Link>
 <NavDropdown title={`${userInfo?.name} ${userInfo?.lastName}`} id="collapsible-nav-dropdown">

<NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders">My Orders</NavDropdown.Item>
<NavDropdown.Item eventKey="/user" as={Link} to="/user">My Profile</NavDropdown.Item>
<NavDropdown.Item eventKey="/user/UpdateProfilePhoto" as={Link} to="/user/UpdateProfilePhoto">Update Profile photo</NavDropdown.Item>
<NavDropdown.Item onClick={logOutHandle}>Logout</NavDropdown.Item>

</NavDropdown>
 </>
  ) :
  // not login 
   (
<>
<LinkContainer to="/login">
                  <Nav.Link>
                   Login
                   </Nav.Link>
                   </LinkContainer>

                  <LinkContainer to="/register">
                  <Nav.Link>
                   Register
                   </Nav.Link>
                   </LinkContainer>
</>
   ))}


              

          
            

        {
          userInfo?.name && !userInfo.isAdmin &&
          <LinkContainer to="/cart">
                  <Nav.Link style={{position : "relative"}}>
                  {cartItems?.length > 0 &&
                    <Badge pill bg="danger">
                  {cartItems?.length}
                </Badge>}
                <i className="bi bi-cart-dash"></i>
              <span className="ms-1">  CART</span>
                   </Nav.Link>
                   </LinkContainer>

        }
                   
              </Nav>
      
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default HeaderComponent;




import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";


const LoginPageComponent = ({loginUserApiRequest , dispatch , setReduxUserState }) => {
  const [validated, setValidated] = useState(false);
  const [loginUserRsponseState, setLoginUserRsponseState] = useState({succes : "" , error : "" , loading : false});

  
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget.elements;

    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;

    if (event.currentTarget.checkValidity() === true && email && password) {
      setLoginUserRsponseState({loading : true})
loginUserApiRequest(email, password , doNotLogout).then(res => {  
  setLoginUserRsponseState({succes : res.success , loading : false});

  if (res.loggedUser) {
    dispatch(setReduxUserState(res.loggedUser))
  }
if (res.success === "user logged in successfully" && res.loggedUser.isAdmin)
   window.location.assign("/admin/orders");
 else if (res.success === "user logged in successfully" && !res.loggedUser.isAdmin)
 window.location.assign("/user");
}).catch((error) =>
  setLoginUserRsponseState({error :   error?.response?.data?.message ? error?.response?.data?.message : error?.response?.data})
  
);
    }

    setValidated(true);
  };
  return (
    <Container>
    <Row className="mt-5 justify-content-md-center">
    <Col md={6}>
    <h1>Login</h1>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="enter email"
          name="email"
        />
      </Form.Group>
    
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="password"
          name="password"
        />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          name="doNotLogout"
          label="Do Not Logout"
        />
      </Form.Group>



      <Row className="pb-2">
        <Col>
          Don't you have an account ?  <Link to="/register" style={{textDecoration : "none"}}> Register</Link>
        </Col>
      </Row>
    
    <Button variant="primary" type="submit">
{loginUserRsponseState && loginUserRsponseState.loading === true ? (   
  <Spinner
        className='me-1'
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />) : ("")}
    Login</Button>
    <Alert className="mt-2" variant="danger" 
    show={loginUserRsponseState && loginUserRsponseState.error === "wrong email or password"}>
    Wrong Inputs</Alert>
  </Form>
    </Col>
    </Row>
  </Container>
  )
}

export default LoginPageComponent
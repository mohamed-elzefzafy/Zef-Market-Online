import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";


const LoginPageComponent = ({loginUserApiRequest}) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget.elements;

    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;

    if (event.currentTarget.checkValidity() === true && email && password) {
loginUserApiRequest(email, password , doNotLogout).then(res => console.log(res)).catch((error) =>
console.log(
  error.response.data.message ? error.response.data.message : error.response.data)
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


      <Form.Group className="mb-3" controlId="formBasicPassword">
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
    <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    Login</Button>
    <Alert className="mt-2" variant="danger" show={true}>Wrong Inputs</Alert>
  </Form>
    </Col>
    </Row>
  </Container>
  )
}

export default LoginPageComponent
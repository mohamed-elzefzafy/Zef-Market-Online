import { useState } from "react";
import { Alert, Button, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";


const RegisterPage = () => {
  const [validated, setValidated] = useState(false);

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirm = document.querySelector("input[name=confirmPassword]");

    if (confirm.value === password.value) {
      confirm.setCustomValidity("");
    } else {
      confirm.setCustomValidity("Password don't match");
    }
  }
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
      <Col md={6}>
      <h1>Register</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label>Your name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Your name"
            name="name"
          />
          <Form.Control.Feedback type="invalid">Please enter your name</Form.Control.Feedback>
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Your Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="enter Your Last name"
            name="lastName"
          />
          <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="enter email"
            name="email"
          />
          <Form.Control.Feedback type="invalid">Please enter valid email address</Form.Control.Feedback>
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="password"
            name="password"
            minLength={6}
          />
          <Form.Control.Feedback type="invalid">Please enter your password</Form.Control.Feedback>

        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Repeat Password"
            name="confirmPassword"
            minLength={6}
            onChange={onChange}
          />
          <Form.Control.Feedback type="invalid">Both passwords should match</Form.Control.Feedback>
        </Form.Group>

        <Row className="pb-2">
          <Col>
            Do you have an account already ?  <Link to="/login" style={{textDecoration : "none"}}> Login</Link>
          </Col>
        </Row>
      
      <Button type="submit">
      <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      Submit</Button>
      <Alert variant="danger" show={true}>User with this email alrady exist</Alert>
      <Alert variant="info" show={true}>User created</Alert>
    </Form>
      </Col>
      </Row>
    </Container>
  )
}

export default RegisterPage;
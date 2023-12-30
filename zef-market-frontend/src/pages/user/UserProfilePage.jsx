import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";


const UserProfilePage = () => {

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
    <h1>User Profile</h1>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="validationCustom01">
        <Form.Label>Your name</Form.Label>
        <Form.Control
          required
          type="text"
          defaultValue="john"
          name="name"
        />
        <Form.Control.Feedback type="invalid">Please enter your name</Form.Control.Feedback>
      </Form.Group>
    
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Your Last name</Form.Label>
        <Form.Control
          required
          type="text"
          defaultValue="doe"
          name="lastName"
        />
        <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
        disabled
          name="email"
          value="mohamedelzefzafygmail.com"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          defaultValue=""
          placeholder="Enter your phone number"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          defaultValue=""
          placeholder="Enter your street Name And house number"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCountry">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          defaultValue=""
          placeholder="Enter your Country"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicZip">
        <Form.Label>Zip code</Form.Label>
        <Form.Control
          type="text"
          defaultValue=""
          placeholder="Enter your Zip code"
        />
      </Form.Group>

      
      <Form.Group className="mb-3" controlId="formBasicCity">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          defaultValue=""
          placeholder="Enter your City"
        />
      </Form.Group>
    
    
      <Form.Group className="mb-3" controlId="formBasicState">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          defaultValue=""
          placeholder="Enter your State"
        />
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

    <Button type="submit">
    Update</Button>
    <Alert variant="danger" show={true}>User with this email alrady exist</Alert>
    <Alert variant="info" show={true}>User Updated</Alert>
  </Form>
    </Col>
    </Row>
  </Container>
  )
}

export default UserProfilePage;
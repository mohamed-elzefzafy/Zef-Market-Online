import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


const AdminEditUserPage = () => {

  
  const [validated, setValidated] = useState(false);
  
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
      <Col md={1}>
<Link to="/admin/users" className="btn btn-info  ">Go Back</Link>
      </Col>

      <Col md={6}>
<h1>Edit User</h1>
<Form noValidate validated={validated} onSubmit={handleSubmit}>

<Form.Group className="mb-3" controlId="formBasicfirstName">
        <Form.Label>firstName</Form.Label>
        <Form.Control
          required
          type="text"
          name="name"
          defaultValue="Panasonic"
        />
        <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>LastName</Form.Label>
        <Form.Control
          required
          type="text"
          name="lastName"
          defaultValue="doe"
        />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          name="email"
          defaultValue="email@example.com"
        />
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox" className="mb-3">
        <Form.Check 
          required
          label="Is Admin"
          type="checkbox"
          name="IsAdmin"
        />
    
      </Form.Group>

      <Button variant="primary" type="submit">Update</Button>

</Form>
      </Col>
    </Row>
  </Container>
  )
}

export default AdminEditUserPage;
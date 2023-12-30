import { useState } from "react";
import {  Alert, Button, CloseButton, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


const AdminCreateProductPage = () => {
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
<Link to="/admin/products" className="btn btn-info  ">Go Back</Link>
        </Col>

        <Col md={6}>
  <h1>Create a new product</h1>
  <Form noValidate validated={validated} onSubmit={handleSubmit}>

  <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
          />
          <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextArea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            type="text"
            name="description"
            as="textarea"
            rows={3}
          />
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicCount">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            required
            type="number"
            name="Count"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            required
            type="text"
            name="Price"
          />
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Label>Category <CloseButton /> (<small>remove selected</small>) </Form.Label>
      <Form.Select
      required
      name="Category"
      aria-label="Default Select Example">
        <option value="1">Choose Category</option>
        <option value="2">Laptop</option>
        <option value="3">Tv</option>
        <option>Games</option>
      </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNewCategory">
              <Form.Label>
                Or create a new category (e.g. Computers/Laptops/Intel){" "}
              </Form.Label>
              <Form.Control name="newCategory" type="text" />
            </Form.Group>


        <Row>
        <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicAttributes">
                  <Form.Label>Choose atrribute and set value</Form.Label>
                  <Form.Select
                    name="atrrKey"
                    aria-label="Default select example"
                  >
                    <option>Choose attribute</option>
                    <option value="red">color</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Select
                    name="atrrVal"
                    aria-label="Default select example"
                  >
                    <option>Choose attribute value</option>
                  </Form.Select>
                </Form.Group>
              </Col>
        </Row>

        <Row>
        <Table hover>
        <thead>
          <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                    <th>Delete</th>
          </tr>
        </thead>

        <tbody>
                  <tr>
                    <td>attr key</td>
                    <td>attr value</td>
                    <td>
                      <CloseButton />
                    </td>
                  </tr>
                </tbody>

        </Table>

        <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>Create new attribute</Form.Label>
                  <Form.Control
                    disabled={false}
                    placeholder="first choose or create category"
                    name="newAttrValue"
                    type="text"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNewAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Control
                    disabled={false}
                    placeholder="first choose or create category"
                    required={true}
                    name="newAttrValue"
                    type="text"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Alert variant="primary">
            After typing attribute key and value press enterr on one of the field
            </Alert>

        </Row>

        <Form.Group className="mb-3 mt-3" controlId="formBasicMultiple">
          <Form.Label>Images</Form.Label>
          <Form.Control
            required
            type="file"
            multiple
          />
        </Form.Group>

        <Button variant="primary" type="submit">Create</Button>

  </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminCreateProductPage;
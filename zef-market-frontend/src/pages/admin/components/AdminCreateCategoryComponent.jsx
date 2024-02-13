import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { createCategoryAction, createmmCategory } from '../../../redux/actions/categoryActions'

const AdminCreateCategoryComponent = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState();
  const [attrsKey, setAttrsKey] = useState("");
  const [attrsValue, setAttrsValue] = useState("");
  const [attrs, setAttrs] = useState([]);


  const onSubmitHandler = async(e) => {
    e.preventDefault();
    // const attrsArray = [{key : attrsKey, value : attrsValue}]
    setAttrs({key : attrsKey, value : attrsValue})
    const fd = new FormData();
    fd.append("name" , name);
    fd.append("description" , description);
    fd.append("image" , imageFile);
    for (let i = 0 ; i< attrs.length ; i++) {
      fd.append("attrs" , attrs[0])
    }
   await dispatch(createCategoryAction(fd))
  }


  return (
    <Container>
    <Row className="mt-5 justify-content-md-center">
    <Col md={6}>
    <h1>Create Category</h1>
    <Form noValidate >

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="enter name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </Form.Group>
    
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>description</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </Form.Group>

      <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                <Form.Label>Create new attribute</Form.Label>
                <Form.Control
                  disabled={false}
                  placeholder="first choose or create category"
                  name="newAttrValue"
                  type="text"
                  value={attrsKey}
                  onChange={e => setAttrsKey(e.target.value)}
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
                  value={attrsValue}
                  onChange={e => setAttrsValue(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>



      <Row className="pb-2">
        <Col>
          Don't you have an account ?  <Link to="/register" style={{textDecoration : "none"}}> Register</Link>
        </Col>
      </Row>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Category Image</Form.Label>
        <Form.Control
          required
          type="file"
          // value={attrsKey}
                  onChange={e => setImageFile(e.target.files[0])}
        />
      </Form.Group>
    
    <Button variant="primary" type="submit" onClick={onSubmitHandler}>
  
  <Spinner
        className='me-1'
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />Login</Button>
    <Alert className="mt-2" variant="danger" >Wrong Inputs</Alert>
  </Form>
    </Col>
    </Row>
  </Container>
  )
}

export default AdminCreateCategoryComponent
import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";


const RegisterPageComponent = ({registerApiRequest , setReduxUserState ,  dispatch}) => {
  const [validated, setValidated] = useState(false);
  const [loginUserRsponseState, setLoginUserRsponseState] = useState({succes : "" , error : "" , loading : false});
  const [IsPasswordMatch, setIsPasswordMatch] = useState(true);

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirm = document.querySelector("input[name=confirmPassword]");

    if (confirm.value === password.value) {
    setIsPasswordMatch(true);
    } else {
    setIsPasswordMatch(false)
    }
  }
  
  const handleSubmit =  (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const email = form.email.value;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const password = form.password.value;
    const profilePhoto = form.profilePhoto.files[0];
    if (event.currentTarget.checkValidity() === true && email && name && lastName && password  &&
     form.password.value === form.confirmPassword.value ) {
    const formData = new FormData();
    formData.append("email" ,email )
    formData.append("name" , name)
    formData.append("lastName" , lastName)
    formData.append("password" ,password )
    formData.append("profilePhoto" , profilePhoto);
setLoginUserRsponseState({loading : true})
     registerApiRequest(formData)
     .then(data => {
      setLoginUserRsponseState({succes : data.success ,  loading : false});
      if (data?.createdUser ) 
      {
        dispatch(setReduxUserState(data?.createdUser));
    
      }
        })
     .catch((error) =>
     setLoginUserRsponseState({error :   error?.response?.data?.message ? error?.response?.data?.message : error?.response?.data})
    );
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
          onChange={onChange}
          isInvalid={!IsPasswordMatch}
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
          isInvalid={!IsPasswordMatch}
        />
        <Form.Control.Feedback type="invalid">Both passwords should match</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicprofilePhoto">
        <Form.Label>choose profile image</Form.Label>
        <Form.Control
          type="file"
          name="profilePhoto"
          minLength={6}
          onChange={onChange}
        />
      </Form.Group>

      <Row className="pb-2">
        <Col>
          Do you have an account already ?  <Link to="/login" style={{textDecoration : "none"}}> Login</Link>
        </Col>
      </Row>
    
    <Button type="submit" className="mb-2">
  {loginUserRsponseState && loginUserRsponseState.loading === true ? (
    <Spinner
        className='me-1'
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
  ) : ("")}
    Submit</Button>
    <Alert variant="danger" show={loginUserRsponseState.error === "this user is already exist"}>User with this email alrady exist</Alert>
    <Alert variant="info" show={loginUserRsponseState.succes === "user created"}>User created</Alert>
  </Form>
    </Col>
    </Row>
  </Container>
  )
}

export default RegisterPageComponent
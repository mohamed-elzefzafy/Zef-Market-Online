import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setReduxUserState } from '../../../redux/actions/userActions';

const UserProfilePageComponent = ({updateUserApiRequest , userInfo}) => {

  const [passwordsMatchState, setPasswordsMatchState] = useState(true);
  const [loginUserRsponseState, setLoginUserRsponseState] = useState({succes : "" , error : "" , loading : false});
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch(); 

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirm = document.querySelector("input[name=confirmPassword]");

    if (confirm.value === password.value) {
      setPasswordsMatchState(true);
    } else {
      setPasswordsMatchState(false);
    }
  }
  

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements ;
    const name  = form.name.value;
    const lastName  = form.lastName.value;
    const PhoneNumber  = form.PhoneNumber.value;
    const Address  = form.Address.value;
    const Country  = form.Country.value;
    const zipCode  = form.zipCode.value;
    const city  = form.city.value;
    const state  = form.state.value;
    const password  = form.password.value;

    
    if (event.currentTarget.checkValidity() === true && form.password.value === form.confirmPassword.value ) {
      setLoginUserRsponseState({loading : true ,  error : "" , succes : "" })
    updateUserApiRequest(name , lastName , PhoneNumber ,
       Address , Country , zipCode , city  , state , password).then(data =>{ 
        setLoginUserRsponseState({loading : false , succes : data.success , error : "" })
        dispatch(setReduxUserState(data?.updatedUser))
        console.log(data);
      }).catch(error => 
        setLoginUserRsponseState({error :   error?.response?.data?.message ? error?.response?.data?.message : error?.response?.data})
        )
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
          defaultValue={userInfo?.name}
          name="name"
        />
        <Form.Control.Feedback type="invalid">Please enter your name</Form.Control.Feedback>
      </Form.Group>
    
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Your Last name</Form.Label>
        <Form.Control
          required
          type="text"
          defaultValue={userInfo?.lastName}
          name="lastName"
        />
        <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
        disabled
          defaultValue={userInfo?.email}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          defaultValue={userInfo?.phoneNumber}
          name="PhoneNumber"
          placeholder="Enter your phone number"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          defaultValue={userInfo?.address}
          name="Address"
          placeholder="Enter your street Name And house number"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCountry">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          defaultValue={userInfo?.country}
          name="Country"
          placeholder="Enter your Country"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicZip">
        <Form.Label>Zip code</Form.Label>
        <Form.Control
          type="text"
          defaultValue={userInfo?.zipCode}
          name="zipCode"
          placeholder="Enter your Zip code"
        />
      </Form.Group>

      
      <Form.Group className="mb-3" controlId="formBasicCity">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          defaultValue={userInfo?.city}
          name="city"
          placeholder="Enter your City"
        />
      </Form.Group>
    
    
      <Form.Group className="mb-3" controlId="formBasicState">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          defaultValue={userInfo?.state}
          name="state"
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
          onChange={onChange}
          isInvalid={!passwordsMatchState}
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
          isInvalid={!passwordsMatchState}
        />
        <Form.Control.Feedback type="invalid">Both passwords should match</Form.Control.Feedback>
      </Form.Group>

    <Button type="submit" className="mb-2">
{loginUserRsponseState.loading === true ? (
  <Spinner
        className='me-1'
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
) : ""}
    Update</Button>
    <Alert variant="danger" show={loginUserRsponseState && loginUserRsponseState.error !== ""}>User with this email alrady exist</Alert>
    <Alert variant="info" show={loginUserRsponseState && loginUserRsponseState.succes === "user updated"}>User Updated</Alert>
  </Form>
    </Col>
    </Row>
  </Container>
  )
}

export default UserProfilePageComponent
import React, { useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import AdminLinksComponent from '../../components/admin/AdminLinksComponent'
import { useDispatch, useSelector } from 'react-redux';
import request from '../../utils/request';
import { updateUserProfilePhoto } from '../../redux/actions/userActions';

const AdminUpdateProfilePhoto = () => {
  const {userInfo} = useSelector(state => state.userRegisterLogin);
  const [file, setFile] = useState(null);
const dispatch = useDispatch(); 


  const updateProfilePhoto = async() => {
    if (file) {
      const formData = new FormData();
      formData.append("profilePhoto" , file)
 
     const {data} = await request.post("/api/v1/users/profile/upload-image-profile" , formData);
     
 
     await  dispatch(updateUserProfilePhoto(data?.loggedUser))
  
     if (localStorage.getItem("userInfo") )
     {
       localStorage.setItem("userInfo" , JSON.stringify(data?.loggedUser))
     }
 
     if (sessionStorage.getItem("userInfo") )
     {
       sessionStorage.setItem("userInfo" , JSON.stringify(data?.loggedUser))
     }
     
    }
    
  }

  return (
    <Row className="mt-5 w-100">
    <Col md={2}>
<AdminLinksComponent/>
    </Col>
    <Col md={10}>
    <Container className='text-center mt-5 ' >
      <h1> Update Profile Photo</h1>
    {/* <Row className="mt-5 justify-content-md-center"> */}
<Row className='mt-5 mb-5'>
<Col xs={12}  className="mb-1">
<Image width="250px" height="250px" src={file ? URL.createObjectURL(file)   : userInfo?.profilePhoto?.url}/>
  </Col>
</Row>

<Row className="d-flex justify-content-between align-items-center">
  <Col xs={12} md={6} className="mb-3">
  <Form.Group className="mb-3 fs-5 fw-bold" controlId="formBasicprofileImage">
        <Form.Label className='fs-1 fw-bold'>change profile image</Form.Label>
        <Form.Control
          required
          type="file"
          name="profileImage"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </Form.Group>

  </Col>


  <Col xs={12} md={6} className="mb-1">
<Button className='fs-5 mt-5' onClick={updateProfilePhoto}>Update profile photo</Button>
  </Col>
</Row>

    {/* </Row> */}
  </Container>
  
    </Col>
      </Row>
  )
}

export default AdminUpdateProfilePhoto
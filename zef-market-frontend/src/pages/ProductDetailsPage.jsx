import { Alert, Button, Col, Container, Form, Image, ListGroup, Row } from "react-bootstrap";
import AddToCartMessageComponent from "../components/AddToCartMessageComponent";
import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import imageZoom from "js-image-zoom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
const ProductDetailsPage = () => {
const dispatch = useDispatch();
  var option = {
    scale : 2 ,
    offset : {vertical : 0  , horizontal : 0}
  }
  useEffect(() => {
new imageZoom(document.getElementById("first") , option);
new imageZoom(document.getElementById("second") , option);
new imageZoom(document.getElementById("third") , option);
new imageZoom(document.getElementById("forth") , option);
  },[])

  const addToCartHandler = () => {
dispatch(addToCart())
  }

  const products = useSelector((state) => state.cart.value)
  return (
<Container>
<AddToCartMessageComponent />
<Row className="mt-5">
      <Col style={{zIndex : "1"}} md={4}>
      <div id="first">
      <Image fluid src="images/games-category.png"/>
      </div>
      <br />
      <div id="second">
      <Image fluid src="images/monitors-category.png"/>
      </div>
      <br />
      <div id="third">
      <Image fluid src="images/tablets-category.png"/>
      </div>
      <br />
      <div id="forth">
      <Image fluid src="images/games-category.png"/>
      </div>
    
    
    
    
      </Col>
      <Col md={8}>
        <Row>
          <Col md={8}>

          <ListGroup variant="flush">
      <ListGroup.Item> <h1>Product Name {products}</h1></ListGroup.Item> 
      <ListGroup.Item> <Rating readonly initialValue={4} size={20}/> (1) </ListGroup.Item>
      <ListGroup.Item> Price : <span className="fw-bold">300$</span></ListGroup.Item>
      <ListGroup.Item> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, id?</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
          
          </Col>
          <Col md={4}>
          
          <ListGroup>
      <ListGroup.Item>status : in Stock</ListGroup.Item>
      <ListGroup.Item>Price : <span className="fw-bold">300$</span></ListGroup.Item>
      <ListGroup.Item>

               Quantity : 
      <Form.Select  aria-label="Default select example">
      <option>1</option>
      <option value="1">2</option>
      <option value="2">3</option>
      <option value="3">4</option>
    </Form.Select>
      </ListGroup.Item>
      <ListGroup.Item>
      <Button className="cursor-pointer"   onClick={addToCartHandler} variant="danger">Add To Cart</Button>
      </ListGroup.Item>
    </ListGroup>

          </Col>
        </Row>
        <Row>
          <Col className="mt-5">
            <h5>reviews</h5>
            <ListGroup variant="flush">
            { Array.from({length : 10}).map((Item , index) => 
            <ListGroup.Item key={index}>
            Joun doe <br />
            <Rating readonly size={20} initialValue={5}/>
            <br />
            26-12-2023 <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Repudiandae nisi modi temporibus libero, laudantium cumque?
            </ListGroup.Item>
            )}
     </ListGroup>
            
          </Col>
        </Row>
        <hr />
        review form
        <Alert variant="danger">Login first to send review</Alert>

        <Form>
    
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Write a reviewa</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>

      <Form.Select aria-label="Default select example">
      <option>Your Rating</option>
      <option value="5">5 (Very Good)</option>
      <option value="4">4 (Good)</option>
      <option value="3">3 (Average)</option>
      <option value="2">2 (Bad)</option>
      <option value="1">1 (Awful)</option>
    
    </Form.Select>

    <Button variant="primary" className="mt-3 mb-3">Submit</Button>
    </Form>
      </Col>
    </Row>
</Container>
  );
};

export default ProductDetailsPage;

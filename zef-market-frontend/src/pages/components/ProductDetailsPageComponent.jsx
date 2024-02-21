import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import imageZoom from "js-image-zoom";
import { addToCart } from "../../redux/actions/cartActions";
import { Alert, Button, Col, Container, Form, Image, ListGroup, Modal, Row } from "react-bootstrap";
import AddToCartMessageComponent from "../../components/AddToCartMessageComponent";
import { Rating } from "react-simple-star-rating";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../../redux/actions/productActions";
import { createReview, deleteReview, deleteReviewByAdmin, updateReview } from "../../redux/actions/reviewAction";
import { ToastContainer, toast } from "react-toastify";



const ProductDetailsPageComponent = ({addToCart ,  dispatch , getProductDetails}) => {
  const {id} = useParams();
  const {userInfo} = useSelector(state => state.userRegisterLogin);
const [quantity, setQuantity] = useState(1);
const [showCartMessage, setShowCartMessage] = useState(false);
const [reviewComment, setReviewComment] = useState("");
const [reviewRating, setReviewRating] = useState(0);
const [reviedMsg, setReviedMsg] = useState(false);

const [updatedReviewComment, setUpdatedReviewComment] = useState("");
const [updatedReviewRating, setUpdatedReviewRating] = useState(0);
const [modalShow, setModalShow] = useState(false);


const handleClose = () => {
  setModalShow(false);
}

const handleShowModal = () => {
  setModalShow(true);
}


const {oneProduct} = useSelector(state => state.products);

useEffect(()=>{
  dispatch(getOneProduct(id))
},[id])

const addToCartHandler = () => {
dispatch(addToCart(id , quantity));
setShowCartMessage(true);
}

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


  const writReviewHandler = async() => {
    const data = await dispatch(createReview(id , {
  comment : reviewComment,
  rating : reviewRating
}))

setReviewComment("");
setReviewRating(0)
if (data === "your reviewd this product before")
{
  // toast.warning("Your reviewd this product");
  setReviedMsg(true)
}
  }


  const updateReviewHandler = async(reviewId ) => {
await dispatch(updateReview(id , reviewId , {
  comment : updatedReviewComment,
  rating : updatedReviewRating
}))
handleClose();
setReviedMsg(false);
  }

  const deleteReviewHandler = async( reviewId) => {
await dispatch(deleteReview(id , reviewId))
setReviedMsg(false);
  }

  const deleteReviewByAdminHandler = async( reviewId) => {
    await dispatch(deleteReviewByAdmin(id , reviewId))
  }
  return (
    <Container>
    <AddToCartMessageComponent showCartMessage={showCartMessage} setShowCartMessage={setShowCartMessage}/>
    <Row className="mt-5">

          <Col style={{zIndex : "1"}} md={4}>
    {oneProduct?.images?.map(image => 
    <Fragment key={image?.public_id}>
    <div id="first">
          <Image fluid src={image?.url}/>
          </div>
          <br />
    </Fragment>

    )}
          </Col>
          <Col md={8}>
            <Row>
              <Col md={8}>
    
              <ListGroup variant="flush">
          <ListGroup.Item> <h1>{oneProduct?.name}</h1></ListGroup.Item> 
          <ListGroup.Item> <Rating readonly initialValue={oneProduct?.rating} size={20}/>    <b className="text-danger mt-2">({oneProduct?.reviews?.length +  " " + "Reviews"})</b>  <br /> <b>Rating : <span className="text-danger">{oneProduct?.rating}</span></b> </ListGroup.Item>
          <ListGroup.Item> Price : <span className="fw-bold">{oneProduct?.price}$</span></ListGroup.Item>
          <ListGroup.Item> {oneProduct?.description}</ListGroup.Item>
        </ListGroup>
              </Col>
              <Col md={4}>
              
              <ListGroup>
          <ListGroup.Item>status : {oneProduct?.count > 0 ? "in Stock" : "out of Stock"}</ListGroup.Item>
          <ListGroup.Item>Price : <span className="fw-bold">{oneProduct?.price}$</span></ListGroup.Item>
          <ListGroup.Item>
    
                   Quantity : 
          <Form.Select disabled={oneProduct?.count < 1 }  value={quantity} onChange={(e) => setQuantity(e.target.value)}  aria-label="Default select example">
          <option>{oneProduct?.count < 1 ? "out of Stock" : "Choose"}</option>
          {[...Array(oneProduct?.count).keys()].map(count => 
            <option key={count} value="1">{count + 1}</option>
          )}
    
        </Form.Select>

        <input type="number" disabled={oneProduct?.count < 1 } max={oneProduct?.count} min={1} style={{width : "70px" , outline : "none" , border : "1px solid gray" ,  }} className="ms-2 p-0" />
          </ListGroup.Item>
          <ListGroup.Item>
          <Button className="cursor-pointer" disabled={oneProduct?.count < 1 }  onClick={addToCartHandler} variant="danger">Add To Cart {oneProduct?.count < 1  ? ("Not Avaliable") : ""}</Button>
          </ListGroup.Item>
        </ListGroup>
    
              </Col>
            </Row>
            <Row>
              <Col className="mt-5">
                <h5>reviews</h5>
                <ListGroup variant="flush">
                { oneProduct?.reviews?.map((review , index) => 
<Fragment key={review?._id}>
<ListGroup.Item >
                <h4>{review?.user?.name} {" "} {review?.user?.lastName}</h4>
                <Image width="40px" height="40px" roundedCircle  src={review?.user?.profilePhoto} className="me-2"/>
                {/* <br /> */}
                <Rating readonly size={20} initialValue={review?.rating}/>
                <br />
                <b className="text-danger">{(review?.createdAt)?.substring(0 , 10)} <br /></b>
            <p className="fs-5">{review?.comment}</p>
        {userInfo?.name && userInfo?._id === review?.user?.userId ? (
          <div className="mt-3 fs-4">
        <i className="bi bi-pencil-square text-primary me-3" style={{cursor : "pointer"}} 
        onClick={handleShowModal}></i> 
             <i className="bi bi-trash text-danger" onClick={() => deleteReviewHandler(review?._id)}  style={{cursor : "pointer"}}> </i>
          </div>
        ) : ""}
        {userInfo?.name && userInfo?.isAdmin &&
          <div className=" fs-4 mt-2"> <i className="bi bi-trash-fill text-danger" onClick={() => deleteReviewByAdminHandler(review._id)}  style={{cursor : "pointer"}}> </i></div>
        
        }
                </ListGroup.Item>

                {/* model start  */}
<Modal show={modalShow} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title> <div className="font fs-5">Update Review </div> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label >Write a reviewa</Form.Label>
          <Form.Control defaultValue={review?.comment} onChange={(e) => setUpdatedReviewComment(e.target.value)}/>
        </Form.Group>
  
        <Form.Select defaultValue={review?.rating} aria-label="Default select example" onChange={(e) => setUpdatedReviewRating(e.target.value)}>
        <option value="0">Your Rating</option>
        <option value="5">5 (Very Good)</option>
        <option value="4">4 (Good)</option>
        <option value="3">3 (Average)</option>
        <option value="2">2 (Bad)</option>
        <option value="1">1 (Awful)</option>
      
      </Form.Select>
      </Form>
      
         </Modal.Body>
         <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={() => updateReviewHandler(review._id)}>Save changes</Button>
        </Modal.Footer>
      </Modal>


{/* model end  */}
                
</Fragment>
                )}
         </ListGroup>
                
              </Col>
            </Row>
            <hr />
          
          {!userInfo?.name &&
            <Alert variant="danger">Login first to send review</Alert>
          }
    
      {userInfo.name &&
    
        <Form>
        <h5>  Review Form</h5>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label >Write a reviewe</Form.Label>
          <Form.Control value={reviewComment} as="textarea" rows={3} onChange={(e) => setReviewComment(e.target.value)}/>
        </Form.Group>
  
        <Form.Select value={reviewRating} aria-label="Default select example" onChange={(e) => setReviewRating(e.target.value)}>
        <option>Your Rating</option>
        <option value="5">5 (Very Good)</option>
        <option value="4">4 (Good)</option>
        <option value="3">3 (Average)</option>
        <option value="2">2 (Bad)</option>
        <option value="1">1 (Awful)</option>
      
      </Form.Select>
      <Alert show={reviedMsg} variant="danger">your reviewd this product before</Alert>
  
      <Button variant="primary" className="mt-3 mb-3" onClick={writReviewHandler}>Submit</Button>
      </Form>
      }
          </Col>
        </Row>
    </Container>
  )
}

export default ProductDetailsPageComponent
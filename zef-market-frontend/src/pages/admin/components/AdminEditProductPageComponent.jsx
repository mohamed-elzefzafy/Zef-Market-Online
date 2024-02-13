import { useEffect, useRef, useState } from "react";
import { Alert, Button, CloseButton, Col, Container, Form, Image, Row, Table } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import request from "../../../utils/request";
import { useSelector } from "react-redux";


const AdminEditProductPageComponent = ({categories  , updateProductApiRequest ,
   getOneProduct , updateProductImage , dispatch , fetchProduct ,
    oneProduct , deleteAttribute , deleteProductOneImageHandler , updateProductphotos , setFiles}) => {
  const [validated, setValidated] = useState(false);
  const [updateProductRsponseState, setUpdateProductRsponseState] = useState({succes : "" , error : "" , loading : false});
  const [attributesFromDb, setAttributesFromDb] = useState([]);
  const [selectedAtrrVal, setSelectedAtrrVal] = useState([]);
  const [attrTable, setAttrTable] = useState([]);
  const attrVal = useRef(null);
  const attrKey = useRef(null);

  const [attrKey1, setAttrKey1] = useState();
  const [attrVal1, setAttrVal1] = useState();

  console.log(attrKey.current);
  console.log(attrVal.current);
  const setValFromAtrrFromDbSelectForm = (e) => {
    setAttrKey1(e.target.value);
    console.log(e.target.value);
    if (e.target.value !== "Choose attribute") {
      var selectedAttr = attributesFromDb.find(attribute => attribute.key === e.target.value);
      console.log(selectedAttr.value);
      console.log(selectedAttr);
      setSelectedAtrrVal(selectedAttr.value);
    }
  }
  

  const onHover = {
    cursor: "pointer",
    position: "absolute",
    left: "5px",
    top: "-10px",
    transform: "scale(2.7)",
  };
  


  const {id} = useParams();
 const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget.elements;
    let formInputs = {
      name : form.name.value,
      description : form.description.value,
      count : form.count.value,
      price : form.price.value,
      category : form.category.value ,
    
      attrKey2 : form.atrrKey2.value,
      attrValue2 : form.atrrVal2.value
    
    }

    if (attrKey1 !== "Choose attribute" && attrVal1 !== null)
    {
        formInputs.attrKey   = attrKey1;
        formInputs.attrValue = attrVal1

    }
    
    if (event.currentTarget.checkValidity() === true ) {
    dispatch(updateProductApiRequest(id , formInputs)).then(data =>{
      if (data?.message === "product Updated") {
        navigate("/admin/products")
      }
    }) 
       .catch((error) =>
    setUpdateProductRsponseState({error :   error?.response?.data?.message ? error?.response?.data?.message : error?.response?.data})
   );
    }
    setValidated(true);
  };


useEffect(() => {

  fetchProduct(id)

} ,[ id ])


const handleFileInputChange = (e) => {
  setFiles(e.target.files);
};


useEffect(() => {
  let categoryEditedProduct = categories.find(category => category?._id === oneProduct?.category?._id);
  console.log(categoryEditedProduct);
  if (categoryEditedProduct?.attrs?.length > 0) {
    setAttributesFromDb(categoryEditedProduct?.attrs)
  }
  setAttrTable(oneProduct?.attrs)
} , [oneProduct]);


const changeCategory = (e) => {
  const  selectedCategory = categories.find(category => category._id ===  e.target.value);
  if (selectedCategory.attrs) {
    setAttributesFromDb(selectedCategory.attrs);
    setSelectedAtrrVal(selectedCategory?.attrs?.value)
  } else {
    setAttributesFromDb([]);
    setSelectedAtrrVal([])
  }

}


const changeAttrValue = (e) => {
  setAttrVal1(e.target.value)
}


  return (
    <Container>
    <Row className="mt-5 justify-content-md-center">
      <Col md={1}>
<Link to="/admin/products" className="btn btn-info  ">Go Back</Link>
      </Col>

      <Col md={6}>
<h1>Edit product</h1>
<Form noValidate validated={validated} onSubmit={handleSubmit}>

<Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          name="name"
          defaultValue={id === oneProduct?._id ? oneProduct?.name : ""}
        />
        <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextArea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          required
          type="text"
          name="description"
          defaultValue={id === oneProduct?._id ? oneProduct?.description : ""}
          as="textarea"
          rows={3}
        />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicCount">
        <Form.Label>Count In Stock</Form.Label>
        <Form.Control
          required
          type="number"
          name="count"
          defaultValue={id === oneProduct?._id ? oneProduct?.count : ""}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          required
          type="text"
          name="price"
          defaultValue={id === oneProduct?._id ? oneProduct?.price : ""}
        />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Category </Form.Label>
    <Form.Select
    required
    name="category"
    // defaultValue={id === oneProduct?._id ? oneProduct?.category?._id : ""}
    aria-label="Default Select Example" onChange={changeCategory}>
      <option value="" >Choose Category</option>
    {categories?.map((category , index) => {
      return   oneProduct?.category?._id === category?._id ?
       (<option selected value={category?._id} key={index}>{category?.name}</option>) :
        (<option  value={category?._id} key={index}>{category?.name}</option>)
    }
    
    )}


    </Form.Select>
      </Form.Group>

{oneProduct?.category?.attrs?.length > 0 && 
  <Row>
      <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicAttributes">
                <Form.Label>Choose atrribute and set value</Form.Label>
                <Form.Select
                  name="atrrKey"
                  aria-label="Default select example"
                  ref={attrKey}
                  onChange={setValFromAtrrFromDbSelectForm}
                >
                  <option>Choose attribute</option>
                  {attributesFromDb.map((attribute, index) => 
                    <option key={index} value={attribute?.key}>{attribute?.key}</option>
                  )}
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
                  ref={attrVal}
                  onChange={changeAttrValue}
                >
                   <option>Choose value</option>
                    {selectedAtrrVal?.map((attribute, index) => 
                    <option key={index} value={attribute}>{attribute}</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Col>
      </Row>}

      <Row>
  


      <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                <Form.Label>Create new attribute</Form.Label>
                <Form.Control
                  disabled={false}
                  placeholder="first choose or create category"
                  name="atrrKey2"
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
                  // required={true}
                  name="atrrVal2"
                  type="text"
                />
              </Form.Group>
            </Col>
          </Row>
          {/* <Alert variant="primary">
          After typing attribute key and value press enterr on one of the field
          </Alert>

           */}

           { attrTable && attrTable?.length > 0 &&
    <Table hover>
      <thead>
        <tr>
                  <th>Attribute</th>
                  <th>Value</th>
                  <th>Delete</th>
        </tr>
      </thead>

      <tbody>
              {attrTable?.map((attr, index) => 
                <tr key={index}>
                  <td>{attr?.key}</td>
                  <td>{attr?.value}</td>
                  <td>
                    <CloseButton  onClick={() => deleteAttribute(oneProduct?._id , attr?.key)}/>
                  </td>
                </tr>
              )}
              </tbody>

      </Table>
  }

      </Row>

  
      <Button className="mb-4" variant="primary" type="submit">Update product</Button>

</Form>


<form>
<Form.Group className="mb-3 mt-3" controlId="formBasicMultiple">
        {/* <Form.Label>Images</Form.Label> */}
        <Row className="mb-3">

        {oneProduct?.images?.map((image , index) => 
          <Col key={index} xs={3} className="position-relative">
            <Image src={image?.url} fluid/>
            <i style={onHover} className="bi bi-x text-danger" 
            onClick={() => deleteProductOneImageHandler(oneProduct?._id , image?.public_id)}></i>
          </Col>
        )}
        
      
        </Row>
        <Form.Control
          required
          type="file"
          multiple
          onChange={handleFileInputChange}
          // value={files}
        />
      </Form.Group>
      <Button style={{cursor : "pointer"}} variant="primary" type="submit" onClick={(e) => updateProductphotos(e , oneProduct?._id)} >Update product images</Button>
</form>
      </Col>
    </Row>
  </Container>
  )
}

export default AdminEditProductPageComponent
import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, Image, Row, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createProduct } from '../../../redux/actions/productActions'
import { createCategoryAction, deleteCategoryAction } from '../../../redux/actions/categoryActions'
import swal from 'sweetalert'
import { toast } from 'react-toastify'

const AdminCreateProductPageComponent = ({categories}) => {
const dispatch = useDispatch();
const navigate = useNavigate();


  const [category, setCategory] = useState("");
  const [attrKey1, setAttrKey1] = useState();
  const [attrVal1, setAttrVal1] = useState();
  const [files, setFiles] = useState([]);
const [categoryAttrKey, setCategoryAttrKey] = useState([]);
const [selectedAttrVal, setSelectedAttrVal] = useState([]);


const [CatCreate, setCatCreate] = useState(false);
const [categoryName, setCategoryName] = useState();
const [categoryDescription, setCategoryDescription] = useState();
const [categoryImage, setCategoryImage] = useState();
const [createCatBtnDisable, setCreateCatBtnDisable] = useState(true);
const [disabledAttrField, setDisabledAttrField] = useState(false);
const [disabledAttrCat, setdisabledAttrCat] = useState(false);
const [attrKeyInitialVal, setAttrKeyInitialVal] = useState();
const [createImageDisplay, setCreateImageDisplay] = useState(false);

const chooseCategory = (e) => {
  if (e.target.value !== "Choose Category") {
  const cat = categories.find(c => c._id === e.target.value)
  setCategoryAttrKey(cat.attrs)
}
  console.log(e.target.value);
  if (e.target.value === "Choose Category")
  {
    setDisabledAttrField(true)
    setdisabledAttrCat(false)
  }else {
    setDisabledAttrField(false)
    setdisabledAttrCat(true)
  }

  setCategory(e.target.value);

setSelectedAttrVal([]);
setAttrKeyInitialVal("Choose attribute")
}

const setValFromAtrrFromDbSelectForm = (e) => {
  const attr = categoryAttrKey.find(c => c.key === e.target.value)
    setSelectedAttrVal(attr?.value)
setAttrKey1(e.target.value);
setAttrKeyInitialVal(e.target.value);
}

  const [validated, setValidated] = useState(false);
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget.elements;

    const fd = new FormData();
    fd.append("name" , form.name.value)
    fd.append("description" , form.description.value)
    fd.append("count" , form.count.value)
    fd.append("price" , form.price.value)
    fd.append("category" , category)
    fd.append("attrKey2" , form.attrKey2.value)
    fd.append("attrValue2" , form.attrValue2.value)

   if (attrKey1 !== "Choose attribute" && attrVal1 !== null && attrKey1 !== undefined)
     {
       fd.append("attrKey" , attrKey1)
       fd.append("attrValue" , attrVal1)
     }
    

    for (let i = 0; i < files.length; i++) {
      fd.append("images", files[i]);
    }

    if (event.currentTarget.checkValidity() === true) {
      console.log(form.name.value);
      console.log(form.description.value);
      console.log(form.count.value);
      console.log(form.price.value);
      console.log(form.category.value);
      console.log(fd);
  const res = await  dispatch(createProduct(fd));
  console.log(res);
  if ( res && res === "product created")
  {
    navigate("/admin/products");
    // toast.success("product created successfully");
  }
    }
    setValidated(true);
  };


  const onChangeCreateCategory =(e) => {
    if(e.target.value) {
      setCreateCatBtnDisable(false)
    }else {
      setCreateCatBtnDisable(true)
    }
  
   setCategoryName(e.target.value)
   setCreateImageDisplay(true)
  }
  
const createNewCategory = async(e) => {
e.preventDefault();
const categoryFormData = new FormData();
categoryFormData.append("name" , categoryName);
categoryFormData.append("description" , categoryDescription);
categoryFormData.append("image" , categoryImage);

const data = await dispatch(createCategoryAction(categoryFormData));
setCreateCatBtnDisable(true)
setCategory(data?._id);
// setCategoryName("");
setCategoryDescription("");
setCategoryImage("");
setCatCreate(true);
setdisabledAttrCat(true);
}

const deleteCategoryHandler = async() => {
  if (category !== undefined ) {
    swal({
      title: "Are you sure?",
      text: "if you delete this category all products bleong will deleted",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategoryAction(category))
      } 
    });
    
  }

}
  return (
    <Container>
    <Row className="mt-5 justify-content-md-center">
      <Col md={1}>
<Link to="/admin/products" className="btn btn-info  ">Go Back</Link>
      </Col>

      <Col md={6}>
<h1>Create a new product</h1>
<Form noValidate  validated={validated} onSubmit={handleSubmit}>

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
          name="count"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          required
          type="text"
          name="price"
        />
      </Form.Group>

    
      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Category {category && <><i className="bi bi-x-lg fs-3 mx-2 fw-bold text-danger" 
         disabled={CatCreate} onClick={deleteCategoryHandler}></i> (<small>remove selected</small>)</> } 
         </Form.Label>
    <Form.Select
    required
    name="category"
    aria-label="Default Select Example"
    onChange={chooseCategory}
    disabled={CatCreate}
    >
      <option value="Choose Category">Choose Category</option>
      {categories?.map(category => 
        <option value={category?._id}>{category?.name}</option>
      )}
    

    </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNewCategory" >
            <Form.Label>
           create new category category name (remove any selected category above){" "}
            </Form.Label>
            <Form.Control name="newCategory" type="text" 
              onChange={onChangeCreateCategory}
              value={categoryName}
              placeholder='category name'
              onKeyUp={(e) => e.target.value === "" ? setCatCreate(false) : setCatCreate(true)}
              disabled={disabledAttrCat}
              
            />
          </Form.Group>

      
      {createImageDisplay === true   &&
      <>
      <Form.Group className="mb-3" controlId="formBasicNewCategory" >
            <Form.Label>
              category description  {" "}
            </Form.Label>
            <Form.Control name="newCategory" type="text" 
              onChange={(e) => setCategoryDescription(e.target.value)}
              placeholder='category description'
              onKeyUp={(e) => e.target.value === "" ? setCatCreate(false) : setCatCreate(true)}
              disabled={disabledAttrCat}
              value={categoryDescription}
              
            />
          </Form.Group>

        {categoryImage && !createCatBtnDisable && 
          <Image width="100px" height="100px" src={categoryImage && URL.createObjectURL(categoryImage)} fluid/>
          }

          <Form.Group className="mb-3 mt-3" controlId="formBasicMultiple">
        <Form.Label>Category Image</Form.Label>
        <Form.Control
          // required
          disabled={disabledAttrCat}
          type="file"
          onChange={(e) => setCategoryImage(e.target.files[0])}
        />
      </Form.Group>
      <Button disabled={createCatBtnDisable} onClick={createNewCategory} variant="info" className='mb-2' type="submit">Create New Category</Button>
      </>
      
      }

        
        {createCatBtnDisable ? ("") : (
          <Alert variant="danger">
          input -  Create New Category First - then create the product
          </Alert>
        )}
      <Row>
      <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicAttributes">
                <Form.Label>Choose atrribute and set value</Form.Label>
                <Form.Select
                  name="atrrKey"
                  aria-label="Default select example"
                  onChange={setValFromAtrrFromDbSelectForm}
                  disabled={disabledAttrField}
                  value={attrKeyInitialVal}
              
                >
                  <option value="Choose attribute">Choose attribute</option>
                  {categoryAttrKey.map(attribute => 
                    <option value={attribute.key}>{attribute.key}</option>
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
                  onChange={(e) => setAttrVal1(e.target.value)}
                  disabled={disabledAttrField}
                >
                <option>Choose attribute value</option>
                {selectedAttrVal?.map(attVal =>
                  <option value={attVal}>{attVal}</option> 
                )}
                </Form.Select>
              </Form.Group>
            </Col>
      </Row>

      <Row>

      <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                <Form.Label>Create new attribute</Form.Label>
                <Form.Control
                  disabled={false}
                  placeholder="first choose or create category"
                  name="attrKey2"
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
                  name="attrValue2"
                  type="text"
                />
              </Form.Group>
            </Col>
          </Row>

      </Row>

      <Form.Group className="mb-3 mt-3" controlId="formBasicMultiple">
        <Form.Label>Images</Form.Label>
        <Form.Control
          required
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
      </Form.Group>


      <Button variant="primary" type="submit">Create Product</Button>

</Form>
      </Col>
    </Row>
  </Container>
  )
}

export default AdminCreateProductPageComponent
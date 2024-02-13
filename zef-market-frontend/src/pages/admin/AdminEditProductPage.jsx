import { useDispatch, useSelector } from "react-redux";
import AdminEditProductPageComponent from "./components/AdminEditProductPageComponent";
import request from "../../utils/request";
import { deleteProductAttribute, deleteProductImage, getOneProduct, updateProduct, updateProductImage } from './../../redux/actions/productActions';
import { useState } from "react";


// const fetchProducts = async (id) => {
//   const {data} = await request.get(`/api/v1/products/get-one/${id}`);
//   return data;
// }



const AdminEditProductPage = () => {
  const [files , setFiles] = useState([]);
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state.getCategories);
  const {oneProduct} = useSelector(state => state.products);
  // const updateProductApiRequest = (id, formInputs) => {
  //   dispatch(updateProduct(id , formInputs));
  //  }

  const fetchProduct = async (id) => {
  await  dispatch(getOneProduct(id))
  }


  const deleteAttribute = async (id , attribute) => {
    await dispatch(deleteProductAttribute(id, attribute));
    }

    const deleteProductOneImageHandler = async (id , publicId) => {
  await dispatch(deleteProductImage(id, publicId));
    }

    const updateProductphotos =async (e , id) => {
      e.preventDefault();
    
      const formData = new FormData();
    //  files.map((file) => formData.append("images" , file));
    
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    dispatch(updateProductImage(id , formData))
    
    }
    
  return (
<AdminEditProductPageComponent categories={categories}
  updateProductApiRequest={updateProduct} getOneProduct={getOneProduct} 
  updateProductImage={updateProductImage} dispatch={dispatch} fetchProduct={fetchProduct}
   oneProduct={oneProduct} deleteAttribute={deleteAttribute}
    deleteProductOneImageHandler={deleteProductOneImageHandler} updateProductphotos={updateProductphotos} setFiles={setFiles}/>
  )
}

export default AdminEditProductPage;
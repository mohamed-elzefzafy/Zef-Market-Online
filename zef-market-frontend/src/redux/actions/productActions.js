import request from "../../utils/request";
import { CREATE_PRODUCT, GET_ALL_PRODUCTS, GET_BEST_SELLER_PRODUCTS, GET_ONE_PRODUCT } from "../constants";



export const getAllProductsAction = (categoryId  , pageNumParam  , searchQuery  , filters , sortOption) => async(dispatch) => {

  const {data} = await request.get("/api/v1/products");
  dispatch({
    type :GET_ALL_PRODUCTS,
    payLoad : data?.products
  })
  return data;
}






export const getOneProduct = (id) => async(dispatch) => {

  const {data} = await request.get(`/api/v1/products/get-one/${id}`);
  dispatch({
    type : GET_ONE_PRODUCT,
    payLoad : data
  })
}



export const updateProductImage = (id , formData) => async(dispatch) => {

  const {data} = await request.put(`/api/v1/products/admin/update/${id}` , formData);
  dispatch({
    type : GET_ONE_PRODUCT,
    payLoad : data
  })
  return data
}
export const updateProduct = (id , updatedData) => async(dispatch) => {

  const {data} = await request.put(`/api/v1/products/admin/${id}` , {...updatedData});
  dispatch({
    type : GET_ONE_PRODUCT,
    payLoad : data.product
  })
  return data
}

export const deleteProductAttribute = (id , attribute) => async(dispatch) => {

  const {data} = await request.put(`/api/v1/products/attribute/admin/${id}` , {attribute});
  dispatch({
    type : GET_ONE_PRODUCT,
    payLoad : data
  })
}


export const createProduct = (formInputs) => async(dispatch) => {

  const {data} = await request.post(`/api/v1/products/admin` , formInputs);
  dispatch({
    type : CREATE_PRODUCT,
    payLoad : data.product
  })
  return data.message;
}


export const deleteProductImage = (id , publicId) => async(dispatch) => {

  const {data} = await request.put(`/api/v1/products/admin/removeimage/${id}` , {publicId});
  dispatch({
    type : GET_ONE_PRODUCT,
    payLoad : data
  })
}

export const getBestSellerProducts = () => async(dispatch) => {
try {
  const {data} = await request.get(`/api/v1/products/bestseller`);
  dispatch({
    type : GET_BEST_SELLER_PRODUCTS,
    payLoad : data
  })
} catch (error) {
  console.log(error.response.data);
}

  // return data;
}


import { ADD_TO_CART, REMOVE_FROM_CART } from '../constants';
import request from './../../utils/request';



// export const addToCart = (productId , quantity) => async(dispatch , getState) => {
// const {data} = await request.get(`/api/v1/products/get-one/${productId}`);

//   dispatch({
//     type : ADD_TO_CART,
//     payLoad : {
//       _id : data._id,
//       name : data.name,
//       price : data.price,
//       images : data.images[0],
//       count : data.count,
//       quantity
//     }
//   })
//  localStorage.setItem("cart" , JSON.stringify(getState().cart.cartItems));
// }



// export const removeFromCart = (_id , quantity , price) => async(dispatch , getState) => {

//   dispatch( {
//     type : REMOVE_FROM_CART ,
//     payLoad : {
//       _id ,price , quantity
//     }
//   })

//   localStorage.setItem("cart" , JSON.stringify(getState().cart.cartItems));
// }


export const addToCart = (productId , quantity) => async(dispatch) => {
try {
  const {data} = await request.post(`/api/v1/cart/${productId}` , {quantity});
  
  dispatch({
    type : ADD_TO_CART,
    payLoad : {
  cart : data
    }
  })
} catch (error) {
  console.log(error.response.data);
}

  }
  
  
  export const getUserCart = () => async(dispatch) => {
    try {
      const {data} = await request.get(`/api/v1/cart`);
      dispatch({
        type : ADD_TO_CART,
        payLoad : {
      cart : data
        }
      })
    } catch (error) {
      console.log(error.response.data);
    }
    
      }
      
      
  
  export const removeFromCart = (productId) => async(dispatch , getState) => {
try {
  const {data} = await request.put(`/api/v1/cart/remove-product/${productId}`);
    
  dispatch({
    type : ADD_TO_CART,
    payLoad : {
  cart : data
    }
  })


} catch (error) {
  console.log(error.response.data);
}
  }
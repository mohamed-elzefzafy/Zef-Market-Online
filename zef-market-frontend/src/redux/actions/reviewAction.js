
import { GET_ONE_PRODUCT } from '../constants';
import request from './../../utils/request';

export const createReview = (productId , reviewData) => async(dispatch) => {
try {
  const {data} = await request.put(`/api/v1/reviews/${productId}` , {...reviewData});

  dispatch({
    type : GET_ONE_PRODUCT,
    payLoad : data
  })
} catch (error) {
  return error.response.data
}

}


export const deleteReview = (productId , reviewId) => async(dispatch) => {
  try {
    const {data} = await request.put(`/api/v1/reviews/delete-review/${productId}?reviewId=${reviewId}`);
  
    dispatch({
      type : GET_ONE_PRODUCT,
      payLoad : data
    })
  } catch (error) {
    console.log(error.response.data);
  }
  
  }
  
  
  
  export const updateReview = (productId , reviewId , reviewData) => async(dispatch) => {
    try {
      const {data} = 
      await request.put(`/api/v1/reviews/update-review/${productId}?reviewId=${reviewId}` , {...reviewData});
    
      dispatch({
        type : GET_ONE_PRODUCT,
        payLoad : data
      })
    } catch (error) {
      console.log(error.response.data);
    }
    
    }
    
    
    
    export const deleteReviewByAdmin = (productId , reviewId) => async(dispatch) => {
      try {
        const {data} = await request.put(`/api/v1/reviews/delete-review/admin/${productId}?reviewId=${reviewId}`);
      
        dispatch({
          type : GET_ONE_PRODUCT,
          payLoad : data
        })
      } catch (error) {
        console.log(error.response.data);
      }
      
      }
      
      
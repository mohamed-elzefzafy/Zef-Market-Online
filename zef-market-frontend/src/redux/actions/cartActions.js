import { ADD_TO_CART } from "../contants/cartConstant"



export const addToCart = () => (dispatch) => {
  dispatch({
    type : ADD_TO_CART,
    someValue : 0,
  })
}
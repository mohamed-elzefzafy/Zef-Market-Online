import { ADD_TO_CART } from "../constants";


const initialState = {
  cartDetails : [],
}

export const cartReducer = (state = initialState , action) => {
  switch (action.type) {
    case ADD_TO_CART : 
    return {
      ...state,
      cartDetails : action.payLoad.cart
    } 
    default :
    return state
  }
}
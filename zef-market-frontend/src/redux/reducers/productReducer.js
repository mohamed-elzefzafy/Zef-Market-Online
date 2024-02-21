import { CREATE_PRODUCT, GET_ALL_PRODUCTS, GET_BEST_SELLER_PRODUCTS, GET_ONE_PRODUCT } from "../constants";

const initialState = {
  oneProduct : [],
  allProducts : [],
  bestSellerProducts : [],
}
export const productsReducer = ( state = initialState , action) => {
  switch (action.type) {
    case GET_ONE_PRODUCT: 
    return {
      ...state,
      oneProduct : action.payLoad
    } 
    case CREATE_PRODUCT :
      return {
        ...state,
        oneProduct : action.payLoad
      }

      case GET_ALL_PRODUCTS :
        return {
          ...state,
          allProducts : action.payLoad
        }

        case GET_BEST_SELLER_PRODUCTS :
          return {
            ...state,
            bestSellerProducts : action.payLoad
          }
     
   
 
    default :
    return state;
  }
}
import { CREATE_PRODUCT, GET_ONE_PRODUCT } from "../constants";


export const productsReducer = (state = { oneProduct : []} , action) => {
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
 
    default :
    return state;
  }
}
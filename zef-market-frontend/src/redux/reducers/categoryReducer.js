import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES } from "../constants";




export const getCategoriesReducer = (state = { categories : []} , action) => {
  switch (action.type) {
    case GET_CATEGORIES : 
    return {
      ...state,
      categories : action.payLoad
    } 
    case CREATE_CATEGORY : 
    return {
      ...state,
      categories : [...state.categories , action.payLoad]
    }
    case  DELETE_CATEGORY : 
    return {
      ...state,
      categories : state.categories.filter(c => c._id !== action.payLoad)
    }
    default :
    return state;
  }
}
import { CHANGE_USER_PROFILE, LOGIN_USER, LOGOUT_USER } from "../constants";



export const userRegisterLoginReducer = (state = {} , action) => {
  switch (action.type) {
    case LOGIN_USER : 
    return {
      ...state,
      userInfo : action.payLoad
    } 
    case LOGOUT_USER :
      return {}
    case CHANGE_USER_PROFILE :
      return {
      ...state,
      userInfo : action.payLoad
    } 
    default :
    return state;
  }
}
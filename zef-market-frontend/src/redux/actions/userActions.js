import request from "../../utils/request";
import { CHANGE_USER_PROFILE, LOGIN_USER, LOGOUT_USER } from "../constants";

export const setReduxUserState = (userCreated) => (dispatch) => {
  dispatch({
    type : LOGIN_USER,
    payLoad : userCreated,
  })
}


export const logOut = () => async(dispatch) => {
  document.location.href = "/login";
  await request.get("/api/v1/users/logout");
  if (localStorage.getItem("userInfo"))
  {
    localStorage.removeItem("userInfo");
  }

  if (sessionStorage.getItem("userInfo"))
  {
    sessionStorage.removeItem("userInfo");
  }

  dispatch({type : LOGOUT_USER});
}

export const updateUserProfilePhoto = (loggedUser) => (dispatch) => {
  dispatch({
  type : CHANGE_USER_PROFILE,
  payLoad : loggedUser,
})

}



export const ToggleBlockUser = (id) => async() => {

  await request.put(`/api/v1/users/toggle-block/${id}`);

}

















  


import { SET_CHAT_ROOMS } from "../constants";


export const setChatRooms = (user , message) =>  async(dispatch) => {
    dispatch({
      type : SET_CHAT_ROOMS,
      payLoad : {
        user : user,
        message : message
      }
    })
  
    }
  
  
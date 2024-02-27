import { MESSAGE_RECIVED, REMOVE_CHAT_ROOM, SET_CHAT_ROOMS, SET_SOCKET } from "../constants";


export const setChatRooms = (user , message) =>  (dispatch) => {
    dispatch({
      type : SET_CHAT_ROOMS,
      payLoad : {
        user : user,
        message : message
      }
    })
  
    }
  
  
    export const setSocket = (socket) =>  (dispatch) => {
      dispatch({
        type : SET_SOCKET,
        payLoad : {
          socket : socket
        }
      })
    
      }
    
    
      export const messageRecivedAction = (value) =>  (dispatch) => {
        dispatch({
          type : MESSAGE_RECIVED,
          payLoad : {
            value : value
          }
        })
      
        }
      
    
      export const removeChatRoom = (socketId) =>  (dispatch) => {
        dispatch({
          type : REMOVE_CHAT_ROOM,
          payLoad : {
            socketId : socketId
          }
        })
      
        }
      
        
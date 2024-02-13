import { Navigate, Outlet } from "react-router-dom";
import UserChatComponent from "./user/UserChatComponent";
import { useEffect, useState } from "react";
import LoginPage from "../pages/LoginPage";
import request from "../utils/request";


const ProtectedRoutesComponent = ({admin}) => {
const [isAuth, setIsAuth] = useState();
const [isBlocked, setIsBlocked] = useState();

useEffect(() => {
request.get("/api/v1/users/auth/get-token")
.then((data) => {setIsAuth(data.data.isAdmin ? "admin" : "user")
setIsBlocked(data.data.isBlocked)
})
.catch((err) => console.log(err));

},[isAuth])

if (isAuth === undefined)
{
  return <LoginPage/>
}

if (isBlocked) {
  return <>  <LoginPage/> <h1 className="text-center text-danger">You Are Blocked</h1> </>
} else {
  return isAuth && admin && isAuth !== "admin" ? (<Navigate to="/login"/>) :isAuth && admin ? 
  (<Outlet/>) : isAuth && !admin && isAuth === "user" ? (<><UserChatComponent/>  <Outlet/> </>) :  (<Navigate to="/login"/>)
}
 

}

export default ProtectedRoutesComponent; 
import LoginPageComponent from "./components/LoginPageComponent";
import request from './../utils/request';
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";



const loginUserApiRequest = async(email , password , doNotLogout ) => {
  localStorage.getItem("userInfo") ??  localStorage.removeItem("userInfo");
  sessionStorage.getItem("userInfo") ??   sessionStorage.removeItem("userInfo");
  // localStorage.removeItem("userInfo");
  //  sessionStorage.removeItem("userInfo");
const {data} = await request.post("/api/v1/users/login" , {email , password , doNotLogout}); 
if (data?.loggedUser?.doNotLogout) 
{
localStorage.setItem("userInfo" , JSON.stringify(data?.loggedUser))
} else {
  sessionStorage.setItem("userInfo" , JSON.stringify(data?.loggedUser))
}
return data;
}

const LoginPage = () => {
const dispatch = useDispatch();



  return (
<LoginPageComponent loginUserApiRequest={loginUserApiRequest} dispatch={dispatch} setReduxUserState={setReduxUserState}/>
  )
}

export default LoginPage;
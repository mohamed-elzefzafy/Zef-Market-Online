import LoginPageComponent from "./components/LoginPageComponent";
import request from './../utils/request';


const loginUserApiRequest = async(email , password , doNotLogout ) => {
const {data} = await request.post("/api/v1/users/login" , {email , password , doNotLogout});
return data;
}

const LoginPage = () => {


  return (
<LoginPageComponent loginUserApiRequest={loginUserApiRequest}/>
  )
}

export default LoginPage;
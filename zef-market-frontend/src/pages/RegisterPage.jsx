import { useDispatch } from "react-redux";
import request from "../utils/request";
import RegisterPageComponent from "./components/RegisterPageComponent";
import { setReduxUserState } from './../redux/actions/userActions';


const registerApiRequest = async(formData) => {
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("userInfo");
  const {data} = await request.post("/api/v1/users/register" , formData);

  sessionStorage.setItem("userInfo" , JSON.stringify(data?.createdUser));
  if (data.success === "user created") window.location.href = "/user";

  return data;
}


const RegisterPage = () => {
  const dispatch = useDispatch();


  return (
<RegisterPageComponent registerApiRequest={registerApiRequest} setReduxUserState={setReduxUserState} dispatch={dispatch}/>
  )
}

export default RegisterPage;
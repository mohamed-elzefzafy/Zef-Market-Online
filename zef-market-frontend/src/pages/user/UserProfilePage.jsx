import { useSelector } from "react-redux";
import request from "../../utils/request";
import UserProfilePageComponent from "./component/UserProfilePageComponent";


const updateUserApiRequest = async (name , lastName , phoneNumber , address ,
  country , zipCode , city , state , password) => {
const {data} = await request.put("/api/v1/users/profile" , 
{name , lastName , phoneNumber , address , country , zipCode , city , state , password}
)

if (localStorage.getItem("userInfo")) 
{
localStorage.setItem("userInfo" , JSON.stringify(data?.updatedUser))
} else if (sessionStorage.getItem("userInfo")){
sessionStorage.setItem("userInfo" , JSON.stringify(data?.updatedUser))
}

return data;
}


const UserProfilePage = () => {
const {userInfo} = useSelector(state => state.userRegisterLogin);
  return (
<UserProfilePageComponent updateUserApiRequest={updateUserApiRequest} userInfo={userInfo}/>
  )
}

export default UserProfilePage;
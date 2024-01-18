import UserPageComponent from "./components/UserPageComponent";
import request from './../../utils/request';
import axios from "axios";


const fetchUsers = async(abctrl) =>
 {
  const {data} = await request.get("/api/v1/users" , 
//    {
//     signal: abctrl.signal,
// }
);

  return data
  }
  

  const deleteUser = async(id) => 
  {
    const {data} = await request.delete(`/api/v1/users/${id}`);

    return data;
  }


const AdminUsersPage = () => {
return (
  <UserPageComponent fetchUsers={fetchUsers} deleteUser={deleteUser}/>
)

}

export default AdminUsersPage;
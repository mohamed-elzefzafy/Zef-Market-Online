import UserOrdersPageComponent from "./component/UserOrdersPageComponent";
import request from './../../utils/request';

const getOrders = async() => {
  const {data} =  await request.get("/api/v1/orders");
  return data;
}

const UserOrdersPage = () => {
  return (
<UserOrdersPageComponent getOrders={getOrders}/>
  )
}

export default UserOrdersPage;
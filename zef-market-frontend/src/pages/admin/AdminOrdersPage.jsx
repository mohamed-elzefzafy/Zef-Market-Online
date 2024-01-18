import request from "../../utils/request";
import OrdersPageComponent from "./components/OrdersPageComponent";


const AdminOrdersPage = () => {

  const getOrders = async () => 
  {
 const {data} = await request.get("/api/v1/orders/admin");
 return data;
  }

  return (
<OrdersPageComponent getOrders={getOrders}/>
  )
}

export default AdminOrdersPage;
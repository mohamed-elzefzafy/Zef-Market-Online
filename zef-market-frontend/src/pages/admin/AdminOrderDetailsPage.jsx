import OrderDetailsPageComponent from "./components/OrderDetailsPageComponent";
import request from './../../utils/request';


const AdminOrderDetailsPage = () => {

  const getOrder = async(id) => 
  {
  const {data} = await request.get(`http://localhost:8000/api/v1/orders/user/${id}`)
  return data;
   }

   const markAsDeliver = async (id) => {
    const {data} = await request.put(`http://localhost:8000/api/v1/orders/delivered/${id}`);
    if (data) {
      return data;
    }
    }
  return (
<OrderDetailsPageComponent getOrder={getOrder} markAsDeliver={markAsDeliver}/>
  )
}

export default AdminOrderDetailsPage;
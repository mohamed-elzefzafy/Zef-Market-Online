import OrderDetailsPageComponent from "./components/OrderDetailsPageComponent";
import request from './../../utils/request';


const AdminOrderDetailsPage = () => {

  const getOrder = async(id) => 
  {
  const {data} = await request.get(`/api/v1/orders/user/${id}`)
  return data;
   }

   const markAsDeliver = async (id) => {
    const {data} = await request.put(`/api/v1/orders/delivered/${id}`);
    if (data) {
      return data;
    }
    }

    const markAsBaid = async (id) => {
      const {data} = await request.put(`/api/v1/orders/paid/${id}`);
      if (data) {
        return data;
      }
      }

  return (
<OrderDetailsPageComponent getOrder={getOrder} markAsDeliver={markAsDeliver} markAsBaid={markAsBaid}/>
  )
}

export default AdminOrderDetailsPage;
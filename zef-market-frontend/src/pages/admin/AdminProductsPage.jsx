import request from "../../utils/request";
import ProductsPageComponent from "./components/ProductsPageComponent";


const AdminProductsPage = () => {

const fetchProducts = async () => {
const {data} = await request.get("/api/v1/products/admin");
return data;
}

const deleteProduct = async (id) => {
  const {data} = await request.delete(`api/v1/products/admin/${id}`);
  return data;
  }
  return (
<ProductsPageComponent fetchProducts={fetchProducts} deleteProduct={deleteProduct}/>
  )
}

export default AdminProductsPage;
import { useParams } from "react-router-dom";
import request from "../utils/request";
import ProductListPageComponent from "./components/ProductListPageComponent";
import { useSelector } from "react-redux";

const getProducts = async() => {
  const {data} = await request.get("/api/v1/products");
    return data
}

const ProductListPage = () => {
  const {categories} = useSelector(state => state.getCategories);
  
  return (
<ProductListPageComponent getProducts={getProducts} categories={categories}/>
  )
}

export default ProductListPage;
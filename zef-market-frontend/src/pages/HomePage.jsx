import HomePageComponent from "./components/HomePageComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBestSellerProducts } from "../redux/actions/productActions";

const HomePage = () => {
const dispatch = useDispatch();
  const {categories} = useSelector(state => state.getCategories);

  useEffect(() => {
    dispatch(getBestSellerProducts());
  },[])

  return (
<HomePageComponent  categories={categories}/>
  )
}

export default HomePage;
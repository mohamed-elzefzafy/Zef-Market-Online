import { Col, Container, Row } from "react-bootstrap";
import CategoryCardComponent from "../components/CategoryCardComponent";
import ProductCarouselComponent from "../components/ProductCarouselComponent";
import HomePageComponent from "./components/HomePageComponent";
import { useSelector } from "react-redux";

const HomePage = () => {

  const {categories} = useSelector(state => state.getCategories);
  return (
<HomePageComponent categories={categories}/>
  )
}

export default HomePage;
import { useParams } from "react-router-dom";
import request from "../utils/request";
import ProductListPageComponent from "./components/ProductListPageComponent";
import { useSelector } from "react-redux";


let filtersUrl = "";
const proceedFilters = (filters) => {
  filtersUrl = ""
  Object.keys(filters).map((key , index) => {
    if (key === "price") {
      filtersUrl += `&price=${filters[key]}`
    } else if (key === "rating") {
      let rat ="";
      Object.keys(filters[key]).map((key2 , index) => {
      if (index === 0) {
        if (filters[key][key2]) rat += `${key2}`;
      } else {
        if (filters[key][key2]) rat += `,${key2}`;
      }
        return ""
      })
      filtersUrl += `&rating=${rat}`
    } else if (key === "category") {
      let cat = "";
      Object.keys(filters[key]).map(key2 => {
        cat = key2
        return ""
      })
   filtersUrl += `&category=${cat}`
    }else if (key === "attrs") {
if (filters[key].length > 0) {
let att = filters[key].map(( item) => {
  let attrKey = item.key;
  let attValues = item.value.join("-");
   return  attrKey + "-" + attValues ;
} )
filtersUrl += `&attrs=${att}`
}
  }
  


  })
  return filtersUrl;
}

const getProducts = async(categoryId = "", pageNumParam = null, searchQuery="" , filters={} , sortOption="") => {
                      
  filtersUrl = proceedFilters(filters);
  const search = searchQuery ? `search/${searchQuery}` : "";
  const category = categoryId? `category=${categoryId}` : "";
  const url = `/api/v1/products/${search}?${category}&page=${pageNumParam}&${filtersUrl}&sort=${sortOption}`
  const {data} = await request.get(url);

  //
  
  //
    return data
}

const ProductListPage = () => {
  const {categories} = useSelector(state => state.getCategories);
  
  return (
<ProductListPageComponent getProducts={getProducts} categories={categories} proceedFilters={proceedFilters}/>
  )
}

export default ProductListPage;
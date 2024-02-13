
import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES } from '../constants';
import request from './../../utils/request';

export const getCategories = () =>  async(dispatch) => {
const {data} = await request.get("/api/v1/categories");
dispatch({
  type : GET_CATEGORIES,
  payLoad : data
})
}
export const createCategoryAction = (categoryData) =>  async(dispatch) => {
const {data} = await request.post("/api/v1/categories" , categoryData);
dispatch({
  type : CREATE_CATEGORY,
  payLoad : data
})
return data;
}


export const deleteCategoryAction = (id) =>  async(dispatch) => {
  const {data} = await request.delete(`/api/v1/categories/${id}`);

  dispatch({
    type : DELETE_CATEGORY,
    payLoad : data.categoryId
  })
  return data;
  }
  
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import AttributesFilterComponent from "./AttributesFilterComponent";

const CategoryFilterComponent = ({setCategoriesFromFilter , 
  categoryId , choosenCategory , setAttrFilter , attrFilter , setAttrsFromFilter , attrsFromFilter }) => {
  const {categories} = useSelector(state => state.getCategories);
  const [disableCheck, setdisableCheck] = useState(false);
  const [value, setValue] = useState();



  const selectCategory = (e , categoryId , index , categoryObj) => {
  setValue(index);
  setdisableCheck(!disableCheck);
  if (e.target.checked) {
    setAttrFilter(categoryObj.attrs)
  } else {
    setAttrFilter([])
  }

    setCategoriesFromFilter((items => {
      return { ...items , [categoryId] : e.target.checked}
    }))

  }
  useEffect(() => {
    const selectCategoryUrlId = () => {
      setCategoriesFromFilter({[choosenCategory?._id] : true})
  
    }
    if (choosenCategory && categoryId) {
      selectCategoryUrlId()
      
    }
  } ,[categoryId , choosenCategory])



  return (
<>
   <span className="fw-bold">Category</span>
      <Form>{
    
      }
        {
          categoryId && choosenCategory ? (

            <div>
            <Form.Check type="checkbox" id={`check-api2-${choosenCategory?._id}`}>
              <Form.Check.Input checked type="checkbox" isValid />
              <Form.Check.Label style={{cursor : "pointer"}}>{choosenCategory?.name}</Form.Check.Label>
            </Form.Check>
          </div>
          ) : 
          (
            categories?.map((category , index) => (
          <div key={index}>
            <Form.Check type="checkbox" id={`check-api2-${index}`}>
              <Form.Check.Input disabled={index === value  ? false : disableCheck} type="checkbox" isValid 
               onChange={(e) => selectCategory(e , category?._id , index , category)}/>
              <Form.Check.Label style={{cursor : "pointer"}}>{category?.name}</Form.Check.Label>
            </Form.Check>
          </div>
        ))
          )
        }
      </Form>

      <AttributesFilterComponent attrFilter={attrFilter} 
            setAttrsFromFilter={setAttrsFromFilter} attrsFromFilter={attrsFromFilter}/>
</>
  );
};

export default CategoryFilterComponent;

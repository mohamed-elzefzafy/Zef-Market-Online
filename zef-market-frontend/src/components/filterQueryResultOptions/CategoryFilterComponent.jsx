import { useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const CategoryFilterComponent = ({setCategoriesFromFilter}) => {
  const {categories} = useSelector(state => state.getCategories);
  const [disableCheck, setdisableCheck] = useState(false);
  const [value, setValue] = useState();
  

  const selectCategory = (e , category , index) => {
  setValue(index);
  setdisableCheck(!disableCheck);
    setCategoriesFromFilter((items => {
      return { ...items , [category] : e.target.checked}
    }))

  }
  return (
<>
   <span className="fw-bold">Category</span>
      <Form>
        {categories?.map((category , index) => (
          <div key={index}>
            <Form.Check type="checkbox" id={`check-api2-${index}`}>
              <Form.Check.Input disabled={index === value  ? false : disableCheck} type="checkbox" isValid  onChange={(e) => selectCategory(e , category?.name , index)}/>
              <Form.Check.Label style={{cursor : "pointer"}}>{category?.name}</Form.Check.Label>
            </Form.Check>
          </div>
        ))}
      </Form>
</>
  );
};

export default CategoryFilterComponent;

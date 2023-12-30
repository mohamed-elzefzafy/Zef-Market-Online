import { Form } from "react-bootstrap";

const AttributesFilterComponent = () => {
  return (
    <>
    {[{color : ["red" , "green" , "blue"]} , {ram : ["1 TB" , "2 TB" , "4 TB"]} ].map((item , index) => 
    <div key={index} className="mb-3">
    <Form.Label> <b>{Object.keys(item)}</b> </Form.Label>
    {
      item[Object.keys(item)].map((key, index) => 
      <Form.Check 
      key={key}
        type="checkbox"
        id="default-checkbox"
        label={key}
      />
      )
    }
    </div>
    )}
    </>
  );
};

export default AttributesFilterComponent;

import { Form } from "react-bootstrap";

const AttributesFilterComponent = ({attrFilter , setAttrsFromFilter , attrsFromFilter}) => {
  console.log(attrsFromFilter);
  return (
    <>
    {attrFilter && attrFilter?.length > 0 && attrFilter?.map((attr , index) => 
    <div key={index} className="mb-3">
    <Form.Label> <b>{attr?.key}</b> </Form.Label>
    {
      attr?.value?.map((val, idx) => 
      <Form.Check 
      key={idx}
        type="checkbox"
        id={`default-checkbox${index}-${idx}`}
        label={val}
        value={val}
        onChange={e => {
          setAttrsFromFilter(item => {
            console.log(attrsFromFilter);
            if (e.target.checked) {
              let existKey = attrsFromFilter?.find(a => a.key === attr.key)
              if (existKey) {
              let newAttrArray =   attrsFromFilter?.filter(a => a.key !== existKey.key)
            let rr =  existKey.value?.includes(e.target.value)
            if (!rr) {
              existKey?.value?.push(e.target.value)
            }
              newAttrArray?.push(existKey)
              attrsFromFilter = newAttrArray
              return attrsFromFilter
                
              } else {
                attrsFromFilter?.push({key : attr.key , value : [ e.target.value]});
                return attrsFromFilter
              }
              
            } else {
              let existKey = attrsFromFilter?.find(a => a.key === attr.key)
              let newAttrArray = attrsFromFilter;
              if (existKey) {
              existKey.value =  existKey?.value.filter(v => v !== e.target.value);
                if (existKey.value.length === 0) {
                   newAttrArray =   attrsFromFilter?.filter(a => a.key !== existKey.key);
                   attrsFromFilter = newAttrArray;
                   return attrsFromFilter;
                }  }
              return attrsFromFilter  
              }
          })
        }}
      />
      )
    }
    </div>
    )}
    </>
  );
};

export default AttributesFilterComponent;

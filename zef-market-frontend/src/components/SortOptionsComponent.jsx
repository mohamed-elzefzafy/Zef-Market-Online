import { Form } from "react-bootstrap";

const SortOptionsComponent = ({setSortOption}) => {
  return (
    <Form.Select aria-label="Default select example" onChange={(e) => setSortOption(e.target.value)}>
      <option>SORT BY</option>
      <option value="price_1">Low To High</option>
      <option value="price_-1">High To Low</option>
      <option value="rating_-1">Custumer Rating</option>
      <option value="name_1">Name A to Z</option>
      <option value="name_-1">Name Z to A</option>
    </Form.Select>
  );
};

export default SortOptionsComponent;

import { Button } from "react-bootstrap"


const RemoveFromCartComponent = ({removeFromCartHandler , orderCreated , _id , quantity , price}) => {
  return (
    <Button type='button' disabled={orderCreated} variant='secondary'
     onClick={() => removeFromCartHandler(_id , quantity , price)}>
      <i className="bi bi-trash"></i> </Button>
  )
}

export default RemoveFromCartComponent
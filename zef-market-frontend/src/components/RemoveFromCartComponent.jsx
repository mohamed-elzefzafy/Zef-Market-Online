import { Button } from "react-bootstrap"


const RemoveFromCartComponent = ({removeFromCartHandler , orderCreated , productId , quantity , price}) => {
  return (
    <Button type='button' disabled={orderCreated} variant='secondary'
     onClick={() => removeFromCartHandler(productId)}>
      <i className="bi bi-trash"></i> </Button>
  )
}

export default RemoveFromCartComponent
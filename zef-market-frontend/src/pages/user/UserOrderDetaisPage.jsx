import { useSelector } from "react-redux";
import UserOrderDetaisPageComponent from "./component/UserOrderDetaisPageComponent";
import request from "../../utils/request";
import { loadScript } from "@paypal/paypal-js";


const UserOrderDetaisPage = () => {
  const {userInfo} = useSelector(state => state.userRegisterLogin);

  const getOrder = async(id) => {
  const {data} =  await request.get(`/api/v1/orders/user/${id}`);
  return data;
  }

  const loadPaypalScript = (cartSubTotal , cartItems) => {
    loadScript({"client-id" : "Aeu2WO-LF8S5SaGvnCb-QX4jbhaeBr7wn84wfAu121_I-Jf5BOxqHmBP_k-RExisvEGpJyM9TAxXaSEb"})
    .then(paypal => {
      paypal.Buttons(buttons(cartSubTotal , cartItems)).render("#paybal-container-elements")
    })
      .catch((error => console.error(error)))
  }

  const buttons = (cartSubTotal , cartItems) => {
return {
        createOrder : function (data , actions) {
          return actions.order.create({
            purchase_units : [
              {
                amount : {
                  value : cartSubTotal ,
                  breakdown : {
                    item_total : {
                      currency_code : "USD",
                      value : cartSubTotal
                    }
                  }
                } ,
                items : cartItems.map(product => {
                  return {
                    name : product.name ,
                    unit_amount : {
                      currency_code : "USD",
                      value : product.price
                    },
                    quantity : product.quantity
                  }
                })
              }
            ]
          })
        },
        onCancel :onCancelHandler,
        onApprove :function (data, actions) {
          return actions.order.capture().then(function (orderData) {
            console.log(orderData);
            // var transaction = orderData.purchase_units[0].payments.captures[0];
            // if (transaction.status === "COMPLETED" && Number(transaction.amount.value) === Number(cartSubTotal)) {
            //   console.log("db");
            // }
          })
        },
        onError :onErrorHandler,
}
  }
  const createPaypalOrderHandler = function () {
    console.log("createPaypalOrderHandler");
  }
  const onCancelHandler = function () {
    console.log("onCancelHandler");
  }

  const onApproveHandler = function () {
    console.log("onApproveHandler");
  }
  const onErrorHandler = function () {
    console.log("onErrorHandler");
  }




  return (
<UserOrderDetaisPageComponent userInfo={userInfo} getOrder={getOrder} loadScript={loadScript} loadPaypalScript={loadPaypalScript}/>
  )
}

export default UserOrderDetaisPage;
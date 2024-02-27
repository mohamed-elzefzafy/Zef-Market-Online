const asyncHandler = require("express-async-handler");
const OrderModel = require("../models/orderModel");
const ProductModel = require("../models/productModel");
const CartModel = require("../models/cartModel");
const objectId = require("mongodb").ObjectId;

 /**---------------------------------------
 * @desc    get User Orders
 * @route   /api/v1/orders
 * @method  GET
 * @access  private  logged in user 
 ----------------------------------------*/
 exports.getUserOrders = asyncHandler(async (req , res) => {
  const orders = await OrderModel.find({user : new objectId(req.user._id)});
  // .populate("user" , "-_id -email -profilePhoto -password -isAdmin -createdAt");

  if (!orders) {
    return  res.status(400).json("there is no orders for this user");
  }
  res.status(200).json(orders);
 });
 


 /**---------------------------------------
 * @desc    get one Orders
 * @route   /api/v1/orders/user/:id
 * @method  GET  
 * @access  private  logged in user 
 ----------------------------------------*/
 exports.getOneOrder = asyncHandler(async (req , res) => {
  const order = await OrderModel.findOne({_id : new objectId(req.params.id)/* , user : new objectId(req.user._id)*/})
  .populate("user" , "-isAdmin -password -_id -__v -createdAt -updatedAt");
  if (!order) {
    return  res.status(400).json("order not found");
  }
  res.status(200).json(order);
 })


 /**---------------------------------------
 * @desc    createOrder
 * @route   /api/v1/orders
 * @method  POST  
 * @access  private  logged in user 
 ----------------------------------------*/
 exports.createOrder = asyncHandler(async (req , res) => {
    const {paymentMethod} = req.body;

  const cart = await CartModel.findOne({user: req.user._id});
  if (!cart) {
    return  res.status(400).json("cart not found"); 
  }

let ids  = cart.cartItems.map((item) => item.productId )
let qty = cart.cartItems.map((item) => Number(item.quantity) )

let newCartItems = [];
await ProductModel.find({_id :{$in : ids}}).then((products) => {
  products.forEach((product , index) =>
   { 
    const newQuantity = cart.cartItems.find(prod => prod.productId === product._id.toString()).quantity;
newCartItems.push({
  name : product.name,
  productId : product._id,
  price : product.price,
  images : product.images,
  quantity : Number(newQuantity),
  count : product.count,
})
    product.save();
  
  })
});
newCartItems = newCartItems.filter(item => item.count > 0);
for (let i = 0; i < newCartItems.length; i++) {

  if (newCartItems[i].quantity > newCartItems[i].count) {
    newCartItems[i].quantity =  newCartItems[i].count
    
  }
}

let ids2  = newCartItems.map((item) => item.productId )
let qty2 = newCartItems.map((item) => Number(item.quantity) )

await ProductModel.find({_id :{$in : ids2}}).then((products) => {
  products.forEach((product , index) =>
   { 
    product.sales += qty2[index] ;
    product.count -= qty2[index] ;
    product.save();
  
  })});

    let newOrderTotal =  {
      carItemsLength : 0,
      cartSubtotal : 0,
    }
      
  for (let i = 0; i < newCartItems.length; i++) {
    newOrderTotal.cartSubtotal  += (newCartItems[i].price * newCartItems[i].quantity);
    }
  
    newOrderTotal.carItemsLength = newCartItems.length;

    if (newCartItems.length  < 1) {
      return  res.status(400).json("cart items not found"); 
    }
const newOrder = await OrderModel.create({
  user : new objectId(req.user._id),
  cartItems : newCartItems , 
  orderTotal : newOrderTotal ,
  paymentMethod : paymentMethod
});

await newOrder.populate("user" , "-password -isAdmin -createdAt -updatedAt -__v");

const deletedCart = await CartModel.findByIdAndDelete(cart._id);

res.status(201).json({newOrder : newOrder , deletedCart : deletedCart});

 })



/**---------------------------------------
 * @desc    update Order To Paid
 * @route   /api/v1/paid/:id
 * @method  PUT  
 * @access  private  logged in user 
 ----------------------------------------*/
 exports.updateOrderToPaid = asyncHandler(async (req , res) => { 
const order = await OrderModel.findById(req.params.id);

if (!order) 
{
  return  res.status(400).json("order not found")
}

order.isPaid = true;
order.paidAt =  Date.now();
  const updatedOrder =  await order.save();
res.status(200).json(updatedOrder);

 })



/**---------------------------------------
 * @desc    update Order To deliverd
 * @route   /api/v1/delivered/:id
 * @method  PUT  
 * @access  private  logged in user 
 ----------------------------------------*/
 exports.updateOrderToDeliverd = asyncHandler(async (req , res) => { 
const order = await OrderModel.findById(req.params.id);

if (!order) 
{
  return  res.status(400).json("order not found")
}

order.isDelivered = true;
order.deliverdAt =  Date.now();
  const updatedOrder =  await order.save();
res.status(200).json(updatedOrder);

 })



/**---------------------------------------
 * @desc    update Order To deliverd
 * @route   /api/v1/delivered/:id
 * @method  GET  
 * @access  private  admin 
 ----------------------------------------*/
 exports.getOrdersByAdmin = asyncHandler(async (req , res) => { 
  const orders = await OrderModel.find({}).populate("user" , "-password").sort({paymentMethod : "asc"});
  
  res.status(200).json(orders);
  
   })
  
  
  /**---------------------------------------
 * @desc    getOrdersForAnalysis
 * @route   /api/v1//analysts/:date
 * @method  GET  
 * @access  private admin
 ----------------------------------------*/
 exports.getOrdersForAnalysis = asyncHandler(async (req , res) => { 
const start = new Date(req.params.date);
start.setHours(0 , 0 , 0 , 0);
const end = new Date(req.params.date);
end.setHours(23 , 59 , 59 , 999);

const orders = await OrderModel.find({
  createdAt : {
    $gte : start ,
    $lte : end 
  }
}).sort({createdAt : "asc"})

  res.status(200).json(orders);
  
   })
  
  
  
  
















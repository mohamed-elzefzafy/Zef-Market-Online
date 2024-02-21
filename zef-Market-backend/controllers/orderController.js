const asyncHandler = require("express-async-handler");
const OrderModel = require("../models/orderModel");
const ProductModel = require("../models/productModel");
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
  const {cartItems  , orderTotal  , paymentMethod} = req.body;
  if (!(cartItems || orderTotal || paymentMethod)) 
  {
    return  res.status(400).json("all filds are requires");
  }

  let ids  = cartItems.map((item) => item.productId )
  let qty = cartItems.map((item) => Number(item.quantity) )

  await ProductModel.find({_id :{$in : ids}}).then((products) => {
    products.forEach((product , index) =>
     { product.sales += qty[index] ;
      // TODO increase product connt with quantity 
      product.save();
    
    })})


  const order  = new OrderModel({
    user : new objectId(req.user._id),
    cartItems : cartItems , 
    orderTotal : orderTotal ,
    paymentMethod : paymentMethod
  })
const newOrder = await order.save();
res.status(201).json(newOrder);

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
  
  
  
  
















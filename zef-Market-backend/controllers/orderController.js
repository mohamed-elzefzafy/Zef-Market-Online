const asyncHandler = require("express-async-handler");
const OrderModel = require("../models/orderModel");
const objectId = require("mongodb").ObjectId;

 /**---------------------------------------
 * @desc    get User Orders
 * @route   /api/v1/orders
 * @method  GET
 * @access  private  logged in user 
 ----------------------------------------*/
 exports.getUserOrders = asyncHandler(async (req , res) => {
  const orders = await OrderModel.find({user : new objectId(req.user._id)});
  if (orders.length == 0) {
    return  res.status(400).json("there is no orders for this user");
  }
  res.status(200).json(orders);

 })

 /**---------------------------------------
 * @desc    get one Orders
 * @route   /api/v1/orders/user/:id
 * @method  GET
 * @access  private  logged in user 
 ----------------------------------------*/
 exports.getOneOrder = asyncHandler(async (req , res) => {
  const order = await OrderModel.findOne({_id : new objectId(req.params.id) , user : new objectId(req.user._id)});
  if (!order) {
    return  res.status(400).json("order not found");
  }
  res.status(200).json(order);

 })







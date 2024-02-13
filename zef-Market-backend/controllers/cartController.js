const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/productModel");
const CartModel = require("../models/cartModel");

 /**---------------------------------------
 * @desc    create cart
 * @route   /api/v1/cart/:productId
 * @method  POST
 * @access  public 
 ----------------------------------------*/
 exports.addToCart = asyncHandler(async (req , res) => {
  let { quantity } = req.body;
const product = await ProductModel.findById(req.params.productId);
if (!product) {
  return  res.status(400).json(`this no product with id ${req.params.productId}`);
}

if (!quantity) {
  return  res.status(400).json(`quantity is required`);
}


if (product.count === 0) {
  return  res.status(400).json(`this product is not available`);
}
if (quantity > product.count)
{
  quantity = product.count
}

let cartItem = {name : product.name , productId : product._id ,price : product.price , images : product.images[0].url ,  
  quantity : quantity ,count : product.count }

  const  orderTotalObj = {
    itemsCount : product.count,
    cartSubtotal : 1000,
  }


const cartExist = await CartModel.findOne({user : req.user._id});
// console.log(cartExist);
if (cartExist) {
  let productExist = await cartExist.cartItems.find(prod => prod.productId === req.params.productId);
  console.log(productExist);
  if (productExist) {
    let newCartItems = cartExist.cartItems.filter(cart => cart.productId !== req.params.productId);
    cartExist.cartItems = newCartItems;

//   cartExist.cartItems.push(cartItem);
//   cartExist.orderTotal = orderTotalObj;

// await cartExist.save();
  }
  

  cartExist.cartItems.push(cartItem);
  cartExist.orderTotal = orderTotalObj;

  await cartExist.save();
  res.status(201).json(cartExist)
}else {
const cart = await CartModel.create({
user : req.user._id,
cartItems : [cartItem],
orderTotal : orderTotalObj
})

res.status(201).json(cart)
}


 })


 /**---------------------------------------
 * @desc    get All user cart
 * @route   /api/v1/cart
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 exports.getUserCart = asyncHandler(async (req , res) => {
  const cart = await CartModel.find({user : req.user._id});
  res.status(200).json(cart)
 })
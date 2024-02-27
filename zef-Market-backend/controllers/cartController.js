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


if (product.count < 1) {
  return  res.status(400).json(`this product is not available`);
}
if (quantity > product.count)
{
  quantity = product.count
}

let cartItem = {name : product.name , productId : product._id ,price : product.price , images : product.images,  
  quantity : quantity ,count : product.count }

  let  orderTotalObj = {
    carItemsLength : 0,
    cartSubtotal : 1000,
  }


const cartExist = await CartModel.findOne({user : req.user._id});



if (cartExist) {
  let newCartItems = cartExist.cartItems;
  let productExist =  cartExist.cartItems.find(prod => prod.productId === req.params.productId);

  if (productExist) {
   newCartItems = cartExist.cartItems.filter(cart => cart.productId !== req.params.productId);
    newCartItems.push(cartItem)
    cartExist.cartItems = newCartItems;


await cartExist.save();
  } else {
    newCartItems.push(cartItem)
    cartExist.cartItems = newCartItems;

await cartExist.save();
  }
  

  let newCartSubtotal = 0;

for (let i = 0; i < cartExist.cartItems.length; i++) {
  newCartSubtotal += (cartExist.cartItems[i].price * cartExist.cartItems[i].quantity);
  
}

orderTotalObj.cartSubtotal = newCartSubtotal;
orderTotalObj.carItemsLength = cartExist.cartItems.length

  cartExist.orderTotal = orderTotalObj;

  await cartExist.save();
  res.status(201).json(cartExist)
}else {

  orderTotalObj.cartSubtotal = cartItem.price * cartItem.quantity;
  orderTotalObj.carItemsLength = 1
  

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
  const cart = await CartModel.findOne({user : req.user._id});
  if (!cart) {
    return  res.status(400).json(`this no cart for this user`);
  }



  let ids  = cart.cartItems.map((item) => item.productId )
  let qty = cart.cartItems.map((item) => Number(item.quantity) )
  
  let newCartItems = [];
  //////////////////////////////////
  await ProductModel.find({_id :{$in : ids}}).then((products) => {
    products.forEach((product , index) =>
     { 
  newCartItems.push({
    name : product.name,
    productId : product._id,
    price : product.price,
    images : product.images,
    quantity : qty[index],
    count : product.count,
  })
      product.save();
    
    })
  });

  let newOrderTotal =  {
    carItemsLength : 0,
    cartSubtotal : 0,
  }

  newOrderTotal.cartSubtotal 

    
for (let i = 0; i < newCartItems.length; i++) {
  newOrderTotal.cartSubtotal  += (cart.cartItems[i].price * cart.cartItems[i].quantity);
  }
  
  newOrderTotal.carItemsLength = newCartItems.length;

cart.cartItems = newCartItems;
cart.orderTotal = newOrderTotal;

await cart.save();
  res.status(200).json(cart)
 })



  /**---------------------------------------
 * @desc    remove Product From Cart
 * @route   /api/v1/cart/remove-product/:productId
 * @method  PUT
 * @access  public 
 ----------------------------------------*/
 exports.removeProductFromCart = asyncHandler(async (req , res) => {
  let cart = await CartModel.findOne({user : req.user._id});
if (!cart) {
  return  res.status(400).json(`this no cart for this user`);
}

if (cart.orderTotal.carItemsLength === 1) {
 cart.deleteOne();
}


const productExist = cart.cartItems?.find(item => item.productId === req.params.productId);
if (!productExist) {
  return  res.status(400).json(`this no product with id ${req.params.productId}`);
}

if (cart.orderTotal.carItemsLength === 1) {

  await cart.deleteOne();
  res.status(200).json("cart is deleted successfully");
 } else {
  cart.cartItems = cart.cartItems.filter(item => item.productId !== req.params.productId);

  let newCartSubtotal = 0;
  
  for (let i = 0; i < cart.cartItems.length; i++) {
  newCartSubtotal += (cart.cartItems[i].price * cart.cartItems[i].quantity);
  }
  
  cart.orderTotal.cartSubtotal = newCartSubtotal;
  cart.orderTotal.carItemsLength = cart.cartItems.length
  
  await cart.save();
  res.status(200).json(cart);
 }
 

 })


   /**---------------------------------------
 * @desc    remove Product From Cart
 * @route   /api/v1/cart/clear-cart/:cartId
 * @method  PUT
 * @access  public 
 ----------------------------------------*/
 exports.clearCart = asyncHandler(async (req , res) => {
  const cartExist = await CartModel.findById(req.params.cartId);
  if (!cartExist) {
    return  res.status(400).json(`this no cart for this user`);
  }
await CartModel.findByIdAndDelete(req.params.cartId);

res.status(200).json("cart is deleted successfully");
 })
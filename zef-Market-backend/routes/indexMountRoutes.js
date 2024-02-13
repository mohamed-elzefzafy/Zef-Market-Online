const productRoute = require("./productRoute");
const categoryRoute = require("./categoryRoute");
const userRoute = require("./userRoute");
const orderRoute = require("./orderRoute");
const cartRoute = require("./cartRoute");
const reviewsRoute = require("./reviewRoute");

const mountRoutes = (app) => {
  app.use("/api/v1/products" , productRoute);
  app.use("/api/v1/categories" , categoryRoute);
  app.use("/api/v1/users" , userRoute);
  app.use("/api/v1/orders" , orderRoute);
  app.use("/api/v1/cart" , cartRoute);
  app.use("/api/v1/reviews" , reviewsRoute);
}



module.exports = mountRoutes;
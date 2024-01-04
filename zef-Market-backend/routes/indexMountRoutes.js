const productRoute = require("./productRoute");
const categoryRoute = require("./categoryRoute");
const userRoute = require("./userRoute");
const orderRoute = require("./orderRoute");

const mountRoutes = (app) => {
  app.use("/api/v1/products" , productRoute);
  app.use("/api/v1/categories" , categoryRoute);
  app.use("/api/v1/users" , userRoute);
  app.use("/api/v1/orders" , orderRoute);
}



module.exports = mountRoutes;
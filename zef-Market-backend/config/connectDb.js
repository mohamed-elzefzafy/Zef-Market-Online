const mongoose = require("mongoose");


const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_UR);
    console.log("Connected to Mongo Database SUCCESSFULY");
  } catch (error) {
    console.log("connection failed to Mongo database: " , error);
    process.exit(1);
  }
}

module.exports = connectDb;
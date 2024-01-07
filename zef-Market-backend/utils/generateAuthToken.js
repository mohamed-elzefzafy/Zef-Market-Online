const jwt = require("jsonwebtoken");

const generateAuthToken =  (_id , name , lastName , email , isAdmin) => {

return jwt.sign({name, email, lastName , isAdmin} , process.env.JWT_SECRET_KEY , {expiresIn : "7h"});
}

module.exports = generateAuthToken;
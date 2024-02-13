const jwt = require("jsonwebtoken");

const generateAuthToken =  (_id , name , lastName , email , isAdmin , isBlocked) => {

return jwt.sign({_id , name, email, lastName , isAdmin , isBlocked} , process.env.JWT_SECRET_KEY , {expiresIn : "90d"});
}

module.exports = generateAuthToken;
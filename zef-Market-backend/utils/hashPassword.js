const bcrypt = require("bcryptjs");


const salt = bcrypt.genSaltSync(10);
exports.hashPassword =  (password) =>   bcrypt.hashSync(password , salt)



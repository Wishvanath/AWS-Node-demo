const jwt = require("jsonwebtoken")
require('dotenv').config()


function jwtGenerator(user_id){
    const payload = {
        user: user_id
    }
    console.log(payload);
    return  jwt.sign(payload, process.env.jwtSecret, {expiresIn:"14d"})
}

module.exports = jwtGenerator
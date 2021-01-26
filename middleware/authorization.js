const jwt = require("jsonwebtoken")
require("dotenv").config()
module.exports = async (req, res, next) => {
    try {
        // 1. Destructure the token from header
        let  jwtToken = req.header("token");
        console.log("auth middleware ",jwtToken);

        // 2. If there's no token, dont authorize
        if(!jwtToken){
            return res.status(403).json("Not authorised")
        } 
        // 3. If token is present, Send the user_id from the jwt payload with the request
            const payload = jwt.verify(jwtToken,process.env.jwtSecret)
            req.user = payload.user
            next()

    } catch (error) {
        console.log(error.message);
        return res.status(403).json("Not authorised")
        
    }
}

const jwt = require("jsonwebtoken")

const verify = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET, (err,payload) =>{
            if(err){
                
                return res.status(403).json("invalid token")
            }
        req.user = payload
       // console.log(payload)
        next()
        })
    }else{
        res.status(401).json("no authorization")
    }
}

module.exports = verify
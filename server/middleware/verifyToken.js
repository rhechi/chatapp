
const jwt = require("jsonwebtoken")

const verify = (req,res,next) =>{
    let header = null
    let secret = null;
    if(req.headers.auth){header = req.headers.auth ; secret = process.env.JWT_SECRET}
    if(req.headers.refresh){header = req.headers.refresh ; secret = process.env.JWT_REFRESH_SECRET}

    if(header){
        const token = header.split(" ")[1];
        jwt.verify(token,secret, (err,payload) =>{
            if(err){
                
                return res.status(403).json("invalid token") 
            }
        req.jwt = payload
        next()
        })
    }else{
        res.status(401).json("no authorization")
    }
}

module.exports = verify
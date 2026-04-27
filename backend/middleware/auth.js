const jwt = require("jsonwebtoken")
const auth = (req, res,next) => {
    const token = req.headers.authorization?.split(' ')[1]  
    if(!token){
        return res.status(401).send("No token, acess denied")
    }
    try{
        const decoded =  jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch{
        return res.status(401).send("Invalid token")
    }  
}

module.exports = auth
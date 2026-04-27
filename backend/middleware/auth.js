const jwt = require("jsonwebtoken")
const token = req.headers.authorization?.split(' ')[1]

if(!token){
    return res.status(401).send
}
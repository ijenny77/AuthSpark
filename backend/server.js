require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000

app.use(express.json())
const authRoutes = require("./routes/auth")
app.get("/",(req,res)=>{

})
app.use("/auth",authRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("COnnected to database")})
    .catch(error => console.log(error))

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})
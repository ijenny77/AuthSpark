const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register',async(req,res)=>{
    const {name, email,password,confirmPassword} = req.body
    if(password != confirmPassword){
        return res.status(400).send("Passwords do not match")
    }
    if(await User.findOne({email})){
        return res.status(400).send("User already exists!")
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new User({name,email,password:hashedPassword})
    await newUser.save()
    res.status(201).send('User resistered successfully')
})

router.post('/login',async(req,res)=>{
    const {email,password,rememberMe}= req.body
    const isUser = await User.findOne({email})
    if(!isUser){
        return res.status(400).send("User not found")
    }
    const isMatch = await bcrypt.compare(password,isUser.password)
    if(!isMatch){
        return res.status(400).send("Incorrect password")
    }
    const token = jwt.sign(
        {id:isUser._id},
        process.env.JWT_SECRET,
        {expiresIn:rememberMe ? '30d' : '1d'}
    )
    res.json({token})
})

module.exports = router
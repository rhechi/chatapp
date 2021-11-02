const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

//dummy test
router.get('/',(req,res) =>{
    res.status(200).json("yo yo")
})

//Register User
router.post('/register', async (req,res) =>{
  
    try {
        //salt and hash password for storing
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)
        //create a user
        //todo: check and sanitize input-------------------------------------
        const newUser = await new User({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json(err) 
    }

})

//login user
//todo: change auth to local passport-----------------------------------------
//todo: add jwtoken-----------------------------------------------------------------!important
//!warning--shitty code here---needs update
router.post("/login", async (req,res) =>{
    let error = false
    try {
        const user = await User.findOne({email:req.body.email})
        !user ? error = true : null
        if(!error){
        const checkPassword = await bcrypt.compare(req.body.password,user.password)
        !checkPassword ? error= true : null
        }
        
        
        
        if(!error)  {
            
            const accessToken = jwt.sign({
                id: user.id,
            }, process.env.JWT_SECRET)
            res.status(200).json({
                id:user.id,
                accessToken,
            })
        }else res.status(403).json("email or password incorrent")
    } catch (err) {
    //console.log(err)
     res.status(500).json(err) 
    }
            
    })
    //logout------------------------------------------!important
    
    

module.exports = router
//todo: add jwtoken-----------------------------------------------------------------!important

const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { registerDB , getByEmailDB, addTokenDB, deleteTokenDB } = require('../utils/dbHandler')
const verify = require('../middleware/verifyToken')


//jwt
router.post('/refresh', async (req,res)=>{
    const token  = req.body.refreshToken
    const x = await addTokenDB(token)
    console.log(token,x)
    res.status(200).json(x)
})




//Register User
router.post('/register', async (req,res) =>{
  
    try {
        //salt and hash password for storing
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)
        //create a user
        //todo: check and sanitize input----------------------
        const newUser = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
        }
        //db call------------------------
        const user = await registerDB(newUser)
        user? res.status(200).json(user) : null
    } catch (err) {
        console.log(err)
        res.status(500).json(err) 
    }

})

//login user
//!warning--shitty code here---needs update
router.post("/login", async (req,res) =>{
    let error = false
    try {
        //db call-----------------
        const user = await getByEmailDB(req.body.email)
        !user ? error = true : null
        if(!error){
        const checkPassword = await bcrypt.compare(req.body.password,user.password)
        !checkPassword ? error= true : null
        }       
        if(!error)  {   
            const accessToken = jwt.sign({ id: user.id,},
                 process.env.JWT_SECRET,
                 { expiresIn:  "10m"}
                 )
            res.status(200).json({id:user.id,accessToken,})
        }else res.status(403).json("email or password incorrent")
    } catch (err) {
     res.status(500).json(err) 
    }          
    })
    //jwt test
    router.get('/',verify,(req,res)=>{
        const id = req.jwt.id
        res.status(200).json(id)
    })

    //logout------------------------------------------!important
    
    

module.exports = router
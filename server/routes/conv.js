const router = require('express').Router()
const User = require('../models/User')
const Conv = require('../models/Conv')
const verify = require('../middleware/verifyToken')

//new conv---------add validation and verify
router.post("/",async(req,res) =>{
    const newConv = new Conv({
        members:[req.body.senderID,req.body.recieverID]
    })
    try {
        const savedConv = await newConv.save()
        res.status(200).json(savedConv)
    } catch (err) {
        res.status(500).json(err)
    }
})
//get conv of a user

router.get("/:id" , async (req,res) =>{
    const currentID = req.params.id
    try {
        const conv = await Conv.find({
            members : { $in: [currentID]}
        })
        res.status(200).json(conv)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
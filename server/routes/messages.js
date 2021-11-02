const router = require('express').Router()
const User = require('../models/User')
const verify = require('../middleware/verifyToken')

//add
    router.post("/", async (req,res) =>{
        const newMessage = new Message(req.body)
    
    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (err) {
        res.status(200).json(err)
    }
})
//get
router.get("/:convID", async(req,res) =>{
    try {
        const messages = await Message.find({
            conversationID:req.params.convID,
        })
        res.status(200).json(messages)
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;
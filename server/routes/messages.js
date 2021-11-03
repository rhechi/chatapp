const router = require('express').Router()
const User = require('../models/User')
const Message = require('../models/Message')
const verify = require('../middleware/verifyToken')

//add
    router.post("/", async (req,res) =>{
        console.log(req.body)
        const newMessage = new Message(req.body)
        console.log(newMessage)
    
    try {
        //console.log(newMessage)
        const savedMessage = await newMessage.save()
        //console.log(savedMessage)
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
        console.log("fetched messages",messages)
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;
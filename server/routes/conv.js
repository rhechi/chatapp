const router = require('express').Router()
const User = require('../models/User')
const Conv = require('../models/Conv')
const verify = require('../middleware/verifyToken')
const { getConvsDB , setConvDB } = require('../utils/dbHandler')

//new conv---------add validation and verify
router.post("/",async(req,res) =>{
    const newConv = {
        members:[req.body.senderID,req.body.recieverID]
    }
    try {
        //dbcall------------
        const savedConv = await setConvDB(newConv)

        savedConv ? res.status(200).json(savedConv) :  res.status(500).json("error")
    } catch (err) {
        res.status(500).json(err)
    }
})
//get conv of a user

router.get("/:id" , async (req,res) =>{
    const currentID = req.params.id
    try {
        //dbCall-------------
        const conv = await getConvsDB(currentID)
        res.status(200).json(conv)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
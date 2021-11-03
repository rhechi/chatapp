const mongoose = require('mongoose')
const User = require('../models/User')
const Conv = require('../models/Conv')
const Message = require('../models/Message')
const Token = require('../models/Token')


const connect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: true
        })
        console.log(`MongoDb connected: ${connect.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

//auth operations:
//register
const regsiter = async (payload) =>{
try {
    const user = await new User(payload)
    const res = await user.save()
    return res
} catch (err) {
    console.log(err)
    return null
}
}
const getByEmail = async (email) =>{
    try {
        const res = await User.findOne({email:email})
        return res
    } catch (err) {
        console.log(err)
        return null
    }
}
const getById = async (id) =>{
    try {
        const res = await User.findOne({_id:id})
        return res
    } catch (err) {
        console.log(err)
        return null
    }
}

const updateUser = async (id,update) =>{
    try {
        const res = await User.findOneAndUpdate({id:id},{$set:update})
        return res
        
    } catch (err) {
        console.log(err)
        return null
    }
}

const getMessages = async (conversationID) => {
    try {
     
        const res = await Message.find({conversationID})
        return res
    } catch (err) {
        console.log(err)
        return null
    }
    }

    const setMessage = async (message) => {
        const msg = new Message(message)
        try {
            const res = await msg.save()
            return res
        } catch (err) {
            console.log(err)
            return null
        }
        }

    const getConvs = async (id) => {
     
        try {
            const res = await Conv.find({members : {$in:id}})
            return res
        } catch (err) {
            console.log(err)
            return null
        }
        }

        const setConv = async (members) => {
            const conv = new Conv({ members })
            try {
                const res = await conv.save()
                return res
            } catch (err) {
                console.log(err)
                return null
            }
            }

            const addToken = async (token) => {
                const newToken = new Token({token})
                try {
                    const res = await newToken.save()
                    return res
                } catch (err) {
                    console.log(err)
                    return null
                }
                }
                const deleteToken = async (token) => {
                    try {
                        const res = await Token.findOneAndDelete(token)
                        return res
                    } catch (err) {
                        console.log(err)
                        return null
                    }
                    }



                    const getToken = async (token) => {
                        try {
                            const res = await Token.findOne({token})
                            if(res){return true}else{return null}
                            } catch (err) {
                            console.log(err)
                            return null
                        }
                        }
               
/*
const name = async () => {
    try {
        const res = await 
        return res
    } catch (err) {
        console.log(err)
        return null
    }
    }
*/



exports.getTokenDB = getToken
exports.deleteTokenDB = deleteToken
exports.addTokenDB = addToken
exports.setConvDB = setConv
exports.getConvsDB = getConvs
exports.setMessageDB = setMessage
exports.getMessagesDB = getMessages
exports.updateUserDB = updateUser
exports.getByIdDB = getById
exports.getByEmailDB = getByEmail
exports.registerDB = regsiter
exports.connectDB = connect
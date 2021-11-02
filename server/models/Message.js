const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema(
    {
        conversationID:{
            type:string
        },
        sender:{
            type:string
        },
        text:{
            type:string
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model("Message" , MessageSchema)
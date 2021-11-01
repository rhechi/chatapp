const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          //  useFindAndModify: false
        })
        console.log(`MongoDb connected: ${connect.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
const dbHandler = {
    connectDB,
    
    
}

module.exports = dbHandler
const express = require("express")
const path = require('path')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const convRoute = require('./routes/conv')
const messageRoute = require('./routes/messages')
const dbHandler = require('./utils/dbHandler')

dotenv.config({path: './config/config.env'})
const PORT = process.env.PORT || 3000
dbHandler.connectDB()


const app = express()


//Static Folder
//app.use(express.static(path.join(__dirname, 'public')))


// Middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))


//Routers(Endpoints)
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/convs", convRoute)
app.use("/api/messages", messageRoute)


//app.get('/', (req,res) => res.send("welcome to homepage"))

//Listen
app.listen(5000, ()=> {
    console.log(`server running on port ${PORT}`)
})
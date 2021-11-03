//WARNING: This is a test env so i can learn socket.io operations, as shitty as the rest of my code is THIS IS THE SHITTIEST OF THEM ALL

const io = require("socket.io")(8000,{
    cors:{
        origin:"http://localhost:3000"
    }
})

let users = [];
const add = (id, socket) =>{
    !users.some(user=>user.id === id) && users.push({id,socket})
}
const remove = (socketId) =>{
    users = users.filter(user => user.socket != socketId)
}

const getUser = (userId) =>{
    return users.find(user=>user.id == userId)
}

io.on('connection', (socket) => {
    //connect
    socket.on("init", id =>{
        add(id,socket.id)
        io.emit("getUsers",users)
    })
    //disconnect
    socket.on("disconnect" ,()=>{
        remove(socket.id)
        io.emit("getUsers",users)
    })
    //send and get msg
    socket.on("sendMessage", ({senderId, recieverId,text}) =>{
        const user = getUser(recieverId)
        io.to(user.socket).emit("getMessage",{
            senderId,
            text,
        })
    })


    
})
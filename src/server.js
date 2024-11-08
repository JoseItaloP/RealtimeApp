const express = require("express")
const {createServer} = require("node:http")
const { Server } = require("socket.io")

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static('public'))

io.on('connection', (socket) => {
    socket.on("newUser", (Username)=>{
        socket.broadcast.emit("update", Username)
    })
    socket.on("exitUser", (Username)=>{
        socket.broadcast.emit("exit", Username)
    })
    socket.on("chat_message", (chatMensage)=>{
     socket.broadcast.emit("chat", chatMensage)
    })
})

server.listen(5000, ()=>{
    console.log('Server running at port 5000')
})
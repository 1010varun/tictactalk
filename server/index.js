const express = require('express')
const app = express()

const http = require("http")
const server = http.createServer(app)

const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let rooms = {}

io.on("connection", (socket) => {
    console.log("user connected");


    socket.on("Join Room", ({roomCode, userName}) => {
      if(rooms[roomCode]) {
        let length = rooms[roomCode].length;
        if(length === 2) {
          socket.emit("Room Filled")

        }
        else {
          rooms[roomCode].push(socket.id);  
          console.log("A user joined Room", roomCode, socket.id, userName);
          socket.broadcast.to(roomCode).emit("user joined", userName);
          socket.join(roomCode);
        }
      }
      else {
        rooms[roomCode] = [socket.id];
        console.log("A user joined Room", roomCode, socket.id, userName);
        socket.join(roomCode);
      }
    });

    socket.on("play", ({id, roomCode}) => {
      console.log("user in room", roomCode, "play a move at", id);
      socket.broadcast.to(roomCode).emit("game update", id);
    });

    socket.on("disconnect", () => {
      let room = null;
      for (let roomCode in rooms) {
        console.log(rooms[roomCode])
        let index = rooms[roomCode].indexOf(socket.id);
        if(index != -1) {
          room = roomCode;
          rooms[roomCode].splice(index, 1);
        }
      };
      console.log("user disconnected from room", room);
    })
})


server.listen(5000, () => {
  console.log("server is listening on port 5000")
});
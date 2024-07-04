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
      const socketId = socket.id;
      if(rooms[roomCode]) {
        let length = rooms[roomCode].length;
        if(length === 2) {
          socket.emit("Room Filled")

        }
        else {
          rooms[roomCode].push({ socketId, userName });  
          console.log("A user joined Room", roomCode, socket.id, userName);
          socket.broadcast.to(roomCode).emit("user joined", userName);
          socket.join(roomCode);
        }
      }
      else {
        rooms[roomCode] = [{ socketId, userName }];
        console.log("A user joined Room", roomCode, socket.id, userName);
        socket.join(roomCode);
      }
    });

    socket.on("play", ({id, roomCode}) => {
      if(rooms[roomCode].length !== 2) {
        console.log("inside if")
        socket.emit("opponent not present");
      }
      else {
      console.log("user in room", roomCode, "play a move at", id);
      socket.broadcast.to(roomCode).emit("game update", id);
      }
    });

    socket.on("message", ({message, roomCode}) => {
      const fromSocket = socket.id;
      let fromUserName = null;
      if(rooms[roomCode]) {
        rooms[roomCode].forEach((user) => {
          if (user.socketId === fromSocket) {
            fromUserName = user.userName;
          }
        });
        const newMessage = {"userName": fromUserName, message}
        if(rooms[roomCode].messages) {
          rooms[roomCode].messages.push(newMessage);
          console.log(rooms[roomCode].messages)
        }
        else {
          rooms[roomCode].messages = [newMessage];
        }
      socket.broadcast.to(roomCode).emit("newMessage", newMessage);
      };
    })

    socket.on("disconnect", () => {
      let roo = null;
      for (let roomCode in rooms) {
        let room = rooms[roomCode];
        let initialLength = room.length;
        rooms[roomCode] = room.filter((user) => user.socketId !== socket.id);
        if (rooms[roomCode].length < initialLength) {
          roo = roomCode;
        }
      }
      console.log("user disconnected from room", roo);
    })
})


server.listen(5000, () => {
  console.log("server is listening on port 5000")
});
const express = require("express");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
//const { ExpressPeerServer } = require("peer");
// const { PeerServer } = require("peer");

// const peerServer = PeerServer({ port: 9000, path: "/myapp" });
// const peerServer = ExpressPeerServer(server, {
//   debug: true,
// });

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("join-room", (roomId, userId) => {
    console.log("joined");
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message);
    });
  });
});

server.listen(8000);

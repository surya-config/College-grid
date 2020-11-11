require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoURI =
  "mongodb+srv://Config:S8524567539516g@webproj-cluster.o8w6e.mongodb.net/users?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoose instance");
});

mongoose.connection.on("error", () => {
  console.log("Error connecting to mongoose");
});

app.get("/", requireAuth, (req, res) => {
  res.send("Hi there");
});

const server = require("http").Server(app);
const io = require("socket.io")(server);

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

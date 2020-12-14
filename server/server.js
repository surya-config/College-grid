const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const students = require("./routes/api/students");
const teachers = require("./routes/api/teachers");
const notes = require("./routes/api/notes");
var cors = require("cors");

const app = express();
app.use(cors()); // Use this after the variable declaration

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

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

// app.get("/", requireAuth, (req, res) => {
//   res.send("Hi there");
// });

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./studentPassport")(passport);
require("./teacherPassport")(passport);
// Routes
app.use("/api/students", students);
app.use("/api/teachers", teachers);
app.use("/api/notes", notes);

// var questionsList = db.collection("questionsList");

// app.get("/questions-list", (req, res) => {
//   questionsList.find().toArray(function (err, data) {
//     console.log(data);
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

// app.get("/questions", (req, res) => {
//   Questions.find((err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

// app.post("/questions/add", (req, res) => {
//   const question = req.body;
//   console.log(question);

//   Questions.create(question, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send(data);
//     }
//   });
// });

// app.post("/questions/delete", (req, res) => {
//   const id = req.body.id;

//   console.log(id);

//   Questions.findByIdAndDelete(id, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send(data);
//     }
//   });
// });

// app.post("/question/update", (req, res) => {
//   console.log(req.body);
//   const { id, question, questionType } = req.body;

//   console.log(question, questionType);

//   Questions.findByIdAndUpdate(
//     id,
//     { question: question, question_type: questionType },
//     (err, data) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.status(201).send(data);
//       }
//     }
//   );
// });

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

server.listen(8000, () => {
  console.log("Listening to port 8000");
});

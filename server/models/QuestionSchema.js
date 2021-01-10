const mongoose = require("mongoose");


const quizSchema = mongoose.Schema({
  quizName:String,
  semester:String,
  email:String,
});


// const quizSchema = mongoose.Schema({
//   quizName:String,
//   semester:String,
//   questionArray = [questionSchema]
// });



module.exports = mongoose.model("Quiz", quizSchema);

const mongoose = require("mongoose");


const quizSchema = mongoose.Schema({
  quizName:String,
  semester:String,
  email:String,
  questionsArray:Array
});

module.exports = mongoose.model("Quiz", quizSchema);

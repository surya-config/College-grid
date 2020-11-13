const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TeacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = Teacher = mongoose.model("teachers", TeacherSchema);

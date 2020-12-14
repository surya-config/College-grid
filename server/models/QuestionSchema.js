import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  question: String,
  question_type: String,
});

export default mongoose.model("Questions", questionSchema);

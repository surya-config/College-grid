const mongoose = require("mongoose");

const notesSchema = mongoose.Schema(
  {
    course: {
      type: String,
      required: true,
      trim: true,
    },
    subcode: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: Number,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    file_path: {
      type: String,
      required: true,
    },
    file_mimetype: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;

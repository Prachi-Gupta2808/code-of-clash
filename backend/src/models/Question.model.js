const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    theme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theme",
    },
    statement: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      default: [],
    },
    preTest: {
      type: Map,
      of: Map,
    },
    expectedOutput: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const QuestionModel = mongoose.model("Question", questionSchema);
module.exports = QuestionModel;

const mongoose = require("mongoose");
const matchSchema = new mongoose.Schema(
  {
    player1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    player2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    theme: {
      type: String,
      required: true
    },
    isChallenged: {
      type: Boolean,
      required: true,
    },
    submissionHistoryP1: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission",
      },
    ],
    submissionHistoryP2: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission",
      },
    ],
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    ratingChange: {
      p1: Number,
      p2: Number,
    },
  },
  { timestamps: true },
);

const MatchModel = mongoose.model("Match", matchSchema);
module.exports =  MatchModel;

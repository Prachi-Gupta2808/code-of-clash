const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    submissionTime: {
      type: Date,
      default: Date.now,
    },
    compilationTime: Date,
    error: String,
    language: {
      type: String,
      enum: ["cpp", "java", "python"],
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    memoryTaken: Number,
  },
  { timestamps: true },
);

const SubmissionModel  = mongoose.model("Submission", submissionSchema);
module.exports = SubmissionModel ;

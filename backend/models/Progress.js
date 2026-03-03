const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  topic: String,
  type: {
    type: String,
    enum: ["diagnostic", "practice"],
  },
  score: Number,
  weakConcepts: [String],
  improvement: Number,
}, { timestamps: true });

module.exports = mongoose.model("Progress", progressSchema);
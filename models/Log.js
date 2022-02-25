const mongoose = require("mongoose");

const LogsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  reason: {
      type: String,
      minLength:1,
      required: true
  },
  time: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("classlogs", LogsSchema);

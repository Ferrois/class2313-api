const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
      type: String,
      minLength:1,
      required: true
  },
  time: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("classposts", PostSchema);

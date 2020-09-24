const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: email, required: true },
  password: { type: password, required: true },
});

module.exports = mongoose.model("Post", postSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  googleId: String,
  facebookId: String,
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

mongoose.model("users", userSchema);

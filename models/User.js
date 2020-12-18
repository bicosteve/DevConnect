const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email not found!");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Password is incorrect");

  return user;
};

const User = mongoose.model("users", userSchema);

mongoose.model("users", userSchema);

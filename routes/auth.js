const express = require("express");
const mongoose = require("mongoose");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const validateRegister = require("../validation/register");
const validateLogin = require("../validation/login");
const keys = require("../config/keys");

const route = express();

const User = mongoose.model("users");

route.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegister(req.body);
  if (!isValid) return res.status(400).json(errors);

  try {
    const { username, email, password } = req.body;
    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      errors.email = "Email already registered!";
      return res.status(400).json(errors);
    }

    const newUser = new User({
      username,
      email,
      avatar,
      password,
    });
    const result = await newUser.save();
    if (!result) return res.status(400).json({ msg: "User not created!" });
    res.status(201).json({ newUser, msg: "User created!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

route.post("/login", async (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) return res.status(400).json(errors);

  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    if (!user) {
      errors.email = "Incorrect credentials!";
      return res.status(404).json(errors);
    }

    const payload = { id: user.id, email: user.email };
    const token = await jwt.sign(payload, keys.jwtSecretKey, {
      expiresIn: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user, token: "Bearer " + token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

route.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ msg: req.user });
  }
);

module.exports = route;

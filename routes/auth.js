const express = require("express");

const route = express();

route.get("/auth/register", (req, res) => {
  res.json("This is auth register");
});

module.exports = route;

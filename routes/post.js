const express = require("express");

const route = express();

route.get("/posts", (req, res) => {
  res.json("This is post register");
});

module.exports = route;

const express = require("express");

const route = express();

route.get("/profile/me", (req, res) => {
  res.json("This is profile page");
});

module.exports = route;

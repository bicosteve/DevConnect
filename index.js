const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const keys = require("./config/keys");

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => console.log(error.message));

const app = express();

app.use(bodyParser.json());

//use routes
app.use(require("./routes/auth"));
app.use(require("./routes/profile"));
app.use(require("./routes/post"));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening to ${port}`);
});

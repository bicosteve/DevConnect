const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/User');
require('./models/Profile');
require('./models/Post');
const keys = require('./config/keys');

mongoose
    .connect(keys.mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('Connected to DB...!');
    })
    .catch((error) => console.log(error.message));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport middleware
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);
app.use(passport.initialize());
app.use(passport.session());

//passport config
require('./passport/passport')(passport);

//use routes
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/post', require('./routes/post'));

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening to ${port}...`);
});

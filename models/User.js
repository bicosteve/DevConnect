const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: {
        type: String,
    },
    googleUsername: {
        type: String,
    },
    facebookId: String,
    username: {
        type: String,
        //required: true,
        trim: true,
    },
    email: {
        type: String,
        //required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        //required: true,
        trim: true,
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    resetToken: {
        type: String,
    },
    tokenExpire: {
        type: Date,
    },
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('users', userSchema);

mongoose.model('users', userSchema);

const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const validateRegister = require('../validation/register');
const validateLogin = require('../validation/login');
const validatePasswordReset = require('../validation/password-reset');
const validateNewPassword = require('../validation/new-password');
const { welcomeMail, passwordResetMail } = require('../mail/mails');
const googleLogin = require('../middleware/googleLogin');
const keys = require('../config/keys');

const route = express();

const User = mongoose.model('users');

//route POST auth/register/
//desc Create an account
//access Public route
route.post('/register', async (req, res) => {
    try {
        const { errors, isValid } = validateRegister(req.body);
        if (!isValid) return res.status(400).json(errors);

        const { email } = req.body;
        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            errors.email = 'Email already registered!';
            return res.status(400).json(errors);
        }

        const newUser = new User({ ...req.body, avatar });
        const result = await newUser.save();
        if (!result) return res.status(400).json({ msg: 'User not created!' });
        res.status(201).json({ newUser, msg: 'User created!' });
        await welcomeMail(newUser.email, newUser.username);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

//route POST auth/login/
//desc Log into an account
//access Private route
route.post('/login', async (req, res) => {
    try {
        const { errors, isValid } = validateLogin(req.body);
        if (!isValid) return res.status(400).json(errors);

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            errors.email = 'User does not exist.  Please register!';
            return res.status(404).json(errors);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            errors.password = 'Incorrect logging credentials!';
            return res.status(404).json(errors);
        }

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            googleId: user.googleId,
            googleUsername: user.googleUsername,
            facebookId: user.facebookId,
        };

        const token = await jwt.sign(payload, keys.jwtSecretKey, {
            expiresIn: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ user, token: 'Bearer ' + token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//route GET auth/current/
//desc Get an auth user
//access Private route
route.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.status(200).json({ msg: req.user });
    }
);

//route POST auth/resetPassword/
//send user a reset link
//public
route.post('/resetPassword', async (req, res) => {
    try {
        const { errors, isValid } = validatePasswordReset(req.body);
        if (!isValid) return res.status(400).json(errors);

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            errors.email = 'User does not exist';
            return res.status(404).json(errors);
        }

        crypto.randomBytes(32, (error, buffer) => {
            if (error) {
                console.log(error.message);
            }

            const token = buffer.toString('hex');

            user.resetToken = token;
            user.tokenExpire = Date.now() + 3600 * 1000;

            user.save().then((result) => {
                passwordResetMail(user.email, token);
                return res
                    .status(200)
                    .json({ msg: 'Check your mail for reset link' });
            });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//route POST auth/newPassword/:token
//update new password
//public
route.post('/newPassword', async (req, res) => {
    try {
        const { errors, isValid } = validateNewPassword(req.body);
        if (!isValid) return res.status(400).json(errors);

        const newPassword = req.body.password;
        const sentToken = req.body.token;

        const user = await User.findOne({
            resetToken: sentToken,
            tokenExpire: { $gt: Date.now() },
        });

        if (!user) {
            errors.token = 'Token has expired. Send a new request';
            return res.status(422).json(errors);
        }

        user.password = newPassword;
        user.resetToken = undefined;
        user.tokenExpire = undefined;

        await user.save();

        return res.status(200).json({ msg: 'Password updated' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//route GET auth/google/
//getting the auth Code from Google
//public
route.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

//route GET auth/google/callback
//loading user profile
//public
route.get('/google/callback', passport.authenticate('google', {}), (req, res) => {
    return res.status(200).redirect('/dashboard');
});

//route GET auth/auth_user
//loading logged in user
//public
route.get('/auth_user', (req, res) => {
    console.log(req.user);
    return res.status(200).json(req.user);
});

//route GET auth/logout
//logging out user
//public
route.get('/logout', (req, res) => {
    req.logout();
    res.send(req.user);
});

module.exports = route;

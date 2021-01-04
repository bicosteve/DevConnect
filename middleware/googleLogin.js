const googleLogin = (req, res, next) => {
    if (!req.user) return res.status(401).send({ msg: 'Please login to continue' });
    next();
};

module.exports = googleLogin;

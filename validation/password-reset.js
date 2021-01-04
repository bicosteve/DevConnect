const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validatePasswordReset(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'This must be a valid email';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

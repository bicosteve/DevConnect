const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateNewPassword(data) {
    let errors = {};

    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!validator.isLength(data.password, { min: 2, max: 20 })) {
        errors.password = 'Password must be between 2 and 20 characters';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password is required';
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

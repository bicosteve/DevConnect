const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateProfile(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to be between 2 and 40 charracters';
    }

    if (validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }

    if (validator.isEmpty(data.status)) {
        errors.status = 'Status field is required';
    }

    if (validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required';
    }

    if (!isEmpty(data.bio)) {
        if (!validator.isAscii(data.bio)) {
            errors.bio = 'Only letters are allowed';
        }
    }

    if (!isEmpty(data.githubusername)) {
        if (!validator.isAscii(data.githubusername)) {
            errors.githubusername =
                'Create valid url eg www.dev-connect.com/dev-user';
        }
    }

    if (!isEmpty(data.website)) {
        if (!validator.isURL(data.website)) {
            errors.website = 'Create valid url eg www.dev-connect.com/dev-user';
        }
    }

    if (!isEmpty(data.youtube)) {
        if (!validator.isURL(data.youtube)) {
            errors.youtube = 'Create valid url eg www.dev-connect.com/dev-user';
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!validator.isURL(data.twitter)) {
            errors.twitter = 'Create valid url eg www.dev-connect.com/dev-user';
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!validator.isURL(data.facebook)) {
            errors.facebook = 'Create valid url eg www.dev-connect.com/dev-user';
        }
    }

    if (!isEmpty(data.linkedIn)) {
        if (!validator.isURL(data.linkedIn)) {
            errors.linkedIn = 'Create valid url eg www.dev-connect.com/dev-user';
        }
    }

    if (!isEmpty(data.instagram)) {
        if (!validator.isURL(data.instagram)) {
            errors.instagram = 'Create valid url eg www.dev-connect.com/dev-user';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

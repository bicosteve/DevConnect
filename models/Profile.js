const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    handle: {
        type: String,
        required: true,
        max: 40,
    },
    company: String,
    website: String,
    location: String,
    status: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    bio: String,
    githubusername: String,
    experience: [
        {
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: String,
        },
    ],
    education: [
        {
            school: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            fieldOfStudy: {
                type: String,
                required: true,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: String,
        },
    ],
    social: {
        youtube: String,
        facebook: String,
        twitter: String,
        linkedIn: String,
        instagram: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

mongoose.model('profiles', profileSchema);

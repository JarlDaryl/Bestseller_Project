const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
});

const user = mongoose.model('User', userSchema, "User");

module.exports = user;

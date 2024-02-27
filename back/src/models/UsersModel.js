const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    email: {
        type: String,
        required: [true, "email is mandatory"],
        match: [/^\S+@\S+\.\S+$/, "incorrect email format"],
        unique: true,
        trim: true,
        minLength: 6,
    },
    password: {
        type: String,
        required: [true, "password is mandatory"],
        trim: true,
        minLength: 10,
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

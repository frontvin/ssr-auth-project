const mongoose = require('mongoose');
//Define schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = User = mongoose.model('users', UserSchema);
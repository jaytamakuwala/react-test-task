const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    phone_number: { type: String },
}, {
    timestamps: true,
});

const AuthModel = mongoose.model('AuthModel', authSchema);
module.exports = AuthModel;

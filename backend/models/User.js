const {Schema, model} = require('mongoose');

const {models_name} = require('../constants');
const {passwordService} = require('../services');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    age: {
        type: Number
    },
}, {timestamps: true});

module.except = model(models_name.USER, userSchema);

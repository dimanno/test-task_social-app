const {Schema, model} = require('mongoose');

const {models_name} = require('../constants');

const commentSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    post_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: models_name.POST
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = model(models_name.COMMENT, commentSchema);

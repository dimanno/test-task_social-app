const { Schema, model} = require('mongoose');

const {models_name} = require('../constants');

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {timestamps: true});

module.exports = postSchema.statics = {
    updateData(post_Id, postDataObject) {
        return this.findByIdAndUpdate(
            post_Id,
            postDataObject,
            {new: true, runValidators: true}
        ).lean();
    },
};

module.exports = model(models_name.POST, postSchema);

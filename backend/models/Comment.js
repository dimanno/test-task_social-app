const {Schema, model} = require('mongoose');

const {models_name} = require('../constants');

const commentSchema = new Schema({
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
}, {timestamps: true});

module.exports = commentSchema.statics = {
    updateData(comment_Id, commentDataObject) {
        return this.findByIdAndUpdate(
            comment_Id,
            commentDataObject,
            {new: true, runValidators: true}
        ).lean();
    },
};

module.exports = model(models_name.COMMENT, commentSchema);

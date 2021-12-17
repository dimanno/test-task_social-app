const {Post} = require('../models');
const {messageResponse, statusCodeResponse} = require('../constants');
const ErrorHandler = require('../errors/errorHandler');

module.exports = {
    checkPostExist: async (req, res, next) => {
        try {
            const { post_id } = req.params;

            const post = await Post.findById(post_id).select('-__v');

            if (!post) {
                throw new ErrorHandler(messageResponse.POST_NOT_FOUND, statusCodeResponse.NOT_FOUND);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserPost: async (req, res, next) => {
        try {
            const {user_id:{_id}} = req.user;
            const post = await Post.findOne({post_id: req.params});
            const {user_id} = post;

            if (_id.toString() !== user_id._id.toString()) {
                throw new ErrorHandler(messageResponse.ACCESS_DENIED, statusCodeResponse.CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};

const {Posts, User} = require('../database');
const {messageResponse, statusCodeResponse} = require('../constants');
const ErrorHandler = require('../errors/errors.handler');

module.exports = {
    checkPostExist: async (req, res, next) => {
        try {
            const { post_id } = req.params;

            const post = await Posts.findById(post_id).select('-__v');

            if (!post) {
                throw new ErrorHandler(messageResponse.POST_NOT_FOUND, statusCodeResponse.NOT_FOUND);
            }

            req.post = post;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserPost: async (req, res, next) => {
        try {
            const {user_id:{_id}} = req.user;
            const post = await Posts.findOne({_id: req.params});
            const {user_id} = post;

            if (_id.toString() !== user_id._id.toString()) {
                throw new ErrorHandler(messageResponse.ACCESS_DENIED, statusCodeResponse.CONFLICT);
            }

            req.body = post;
            next();
        } catch (e) {
            next(e);
        }
    }
};

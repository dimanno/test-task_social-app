const {Comment, User} = require('../models');
const ErrorHandler = require('../errors/errorHandler');
const {messageResponse, statusCodeResponse} = require('../constants');

module.exports = {
    isCommentsExist: async (req, res, next) => {
        try {
            const comments = await Comment.find();

            if (!comments) {
                throw new ErrorHandler(messageResponse.COMMENTS_NOT_FOUND, statusCodeResponse.NO_DATA);
            }

            req.body = comments;
            next();
        } catch (e) {
            next(e);
        }
    }
};

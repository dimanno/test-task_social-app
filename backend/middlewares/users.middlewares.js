const {User} = require('../database');
const {messageResponse, statusCodeResponse} = require('../constants');
const ErrorHandler = require('../errors/errors.handler');

module.exports = {
    checkEmailExist: async (req, res, next) => {
        try {
            const userByEmail = await User.findOne({email: req.body.email});

            if (userByEmail) {
                throw new ErrorHandler(messageResponse.DATA_EXIST, statusCodeResponse.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const user = await User
                .findOne({email: req.body.email})
                .select('+password')
                .lean();

            if (!user) {
                throw new ErrorHandler(messageResponse.USER_NOT_FOUND, statusCodeResponse.NOT_FOUND);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserById: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id).lean();
console.log(user)
            if (!user && user_id) {
                throw  new ErrorHandler(messageResponse.USER_NOT_FOUND, statusCodeResponse.NOT_FOUND);
            }

            req.body = user;
            next();
        } catch (e) {
            next(e);
        }
    },
}

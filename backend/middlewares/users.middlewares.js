const {User} = require('../models');
const {messageResponse, statusCodeResponse} = require('../constants');
const ErrorHandler = require('../errors/errorHandler');

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

            if (!user && user_id) {
                throw new ErrorHandler(messageResponse.USER_NOT_FOUND, statusCodeResponse.NOT_FOUND);
            }

            req.body = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkFollow: async (req, res, next) => {
        try {
            const {id} = req.body;
            const {user_id} = req.params;

            if (id === user_id) {
                throw new ErrorHandler('you cannot follow yourself');
            }

            const currentUser = await User.findById(id);
            const {followers} = await User.findById(user_id);

            if (followers.includes(id)) {
                throw new ErrorHandler('you already follow');
            }

            req.body = currentUser;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUnfollow: async (req, res, next) => {
        try {
            const {id} = req.body;
            const {user_id} = req.params;

            if (id === user_id) {
                throw new ErrorHandler('Uou cannot unfollow yourself', statusCodeResponse.FORBIDDEN);
            }

            const userFollow = await User.findById(id);
            const {followers} = await User.findById(user_id);

            if (!followers.includes(id)) {
                throw new ErrorHandler('You dont unfollow this user', statusCodeResponse.FORBIDDEN);
            }

            req.body = userFollow;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (arrayRoles = []) => (req, res, next) => {
        try {
            const {role} = req.body;

            if (!arrayRoles.includes(role)) {
                throw new ErrorHandler(messageResponse.ACCESS_DENIED, statusCodeResponse.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};

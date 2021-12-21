const {messageResponse, statusCodeResponse, constants, actionTokens,} = require('../constants');
const ErrorHandler = require('../errors/errorHandler');
const {passwordService: {compare}, jwtService} = require('../services');
const {O_Auth, ActionTokens} = require('../models');

module.exports = {

    checkPasswordMatched: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashPassword} = req.user;

            await compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkToken: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(messageResponse.INVALID_TOKEN, statusCodeResponse.INVALID_CLIENT);
            }

            await jwtService.verifyToken(token, tokenType);

            const responseToken = await O_Auth
                .findOne({[tokenType]: token})
                .populate('user_id');

            if (!responseToken) {
                throw new ErrorHandler(messageResponse.INVALID_TOKEN, statusCodeResponse.INVALID_CLIENT);
            }

            req.user = responseToken;
            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: (tokenActionType) => async (req, res, next) => {
        try {
            let token = req.get(constants.AUTHORIZATION);

            if (tokenActionType === actionTokens.ACTIVATE_USER) {
                token = req.params.token;
            }

            await jwtService.verifyToken({token}, tokenActionType);
            const {user_id: user, _id} = await ActionTokens
                .findOne({token, type: tokenActionType})
                .populate('user_id');

            if (!user) {
                throw new ErrorHandler(messageResponse.INVALID_TOKEN, statusCodeResponse.INVALID_CLIENT);
            }

            await ActionTokens.deleteOne({_id});
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};

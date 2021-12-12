const {messageResponse, statusCodeResponse, constants} = require('../constants');
const ErrorHandler = require('../errors/errors.handler');
const {passwordService: {compare}, jwtService} = require('../services');
const {AuthData} = require('../database');

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
                throw new  ErrorHandler(messageResponse.INVALID_TOKEN, statusCodeResponse.INVALID_CLIENT);
            }

            await jwtService.verifyToken(token, tokenType);

            const responseToken = await AuthData
                .findOne({[tokenType]: token})
                .populate('user_id');

            if (!responseToken) {
                throw new  ErrorHandler(messageResponse.INVALID_TOKEN, statusCodeResponse.INVALID_CLIENT);
            }

            req.user = responseToken
            req.token = token

            next();
        } catch (e) {
            next(e);
        }
    }
};

const jwt = require('jsonwebtoken');

const {tokenTypeEnum: {ACCESS}} = require('../constants');
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require('../config/config');
const {messageResponse, statusCodeResponse} = require('../constants');
const ErrorHandler = require('../errors/errorHandler');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = ACCESS) => {
        try {
            const secret = tokenType === ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(messageResponse.INVALID_TOKEN, statusCodeResponse.INVALID_CLIENT);
        }
    }
};

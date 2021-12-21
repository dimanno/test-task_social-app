const jwt = require('jsonwebtoken');

const {tokenTypeAuth, actionTokens} = require('../constants');
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_ACTIVATE_SECRET} = require('../config/config');
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

    verifyToken: async (token, tokenType = tokenTypeAuth.ACCESS) => {
        try {
            let secret = '';
            switch (tokenType) {
                case tokenTypeAuth.ACCESS:
                    secret = JWT_ACCESS_SECRET;
                    break;
                case tokenTypeAuth.REFRESH:
                    secret = JWT_REFRESH_SECRET;
                    break;
                case actionTokens.ACTIVATE_USER:
                    secret = JWT_ACTIVATE_SECRET;
                    break;
            }
            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(messageResponse.INVALID_TOKEN, statusCodeResponse.INVALID_CLIENT);
        }
    },

    generateActionToken: (payload, actionToken) => {
        let secret = '';
        switch (actionToken) {
            case actionTokens.ACTIVATE_USER:
                secret = JWT_ACTIVATE_SECRET;
                break;
        }
        return jwt.sign({}, secret, {expiresIn: '1d'});
    }
};

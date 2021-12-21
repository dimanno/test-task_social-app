const {O_Auth} = require('../models');
const {jwtService: {generateTokenPair}} = require('../services');
const {userNormalize} = require('../handler');
const {statusCodeResponse, tokenTypeAuth: {REFRESH, ACCESS}} = require('../constants');

module.exports = {
    login: async (req, res, next) => {
        try {
            const userNormalized = userNormalize(req.user);
            const tokenPair = generateTokenPair();

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    updateRefreshToken: async (req, res, next) => {
        try {
            const {token} = req;
            const tokenPair = generateTokenPair();

            const newTokenPair = await O_Auth.findOneAndUpdate(
                {[REFRESH]: token},
                {...tokenPair}
            );

            res.json(newTokenPair);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const token = req.token;
            await O_Auth.deleteOne({[ACCESS]: token});

            res.sendStatus(statusCodeResponse.NO_DATA).json('You are logged out');
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const {_id} = req.user;
            await O_Auth.deleteMany({user_id: _id});

            res.sendStatus(statusCodeResponse.NO_DATA);
        } catch (e) {
            next(e);
        }
    },
};

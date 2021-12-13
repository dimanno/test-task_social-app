const {User} = require('../models');
const {O_Auth} = require('../models');
const {passwordService} = require('../services');
const {userNormalize} = require('../handler');
const {statusCodeResponse} = require('../constants');

module.exports = {

    addUser: async (req, res, next) => {
        try {
            // const {password} = req.body;
            // const hashedPassword = await passwordService.hash(password);

            const newUser = await User.createUserWithHashPassword(req.body);
            const userNormalise = userNormalize(newUser.toJSON());

            res.status(statusCodeResponse.CREATED).json(userNormalise);
        } catch (e) {
            next(e);
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({}).lean();
            const normUsers = users.map(user => userNormalize(user));

            res.json(normUsers);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const user = userNormalize(req.body);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = req.body;
            const userUpdated = await User.updateData(user_id,
                user, {new: true});

            res.json(userUpdated);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {_id} = req.body;
            console.log(_id)
            await User.deleteOne({_id});
            await O_Auth.deleteMany({user_id: _id});

            res.sendStatus(statusCodeResponse.NO_DATA);
        } catch (e) {
            next(e);
        }
    }
};

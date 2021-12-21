const {User, O_Auth, ActionTokens} = require('../models');
const {emailService: {sendEmail}, jwtService} = require('../services');
const {userNormalize} = require('../handler');
const {statusCodeResponse, emailAction, actionTokens} = require('../constants');

module.exports = {

    addUser: async (req, res, next) => {
        try {
            const {name, email} = req.body;

            const newUser = await User.createUserWithHashPassword(req.body);
            const userNormalise = userNormalize(newUser.toJSON());
            const token = jwtService.generateActionToken({email}, actionTokens.ACTIVATE_USER);

            await ActionTokens.create({
                token,
                type: actionTokens.ACTIVATE_USER,
                user_id: userNormalise._id
            });

            await sendEmail(email, emailAction.WELCOME, {userName: name, token});

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
            // eslint-disable-next-line no-unused-vars
            const {password, updatedAt, __v, ...other} = req.body;

            res.json(other);
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

            await User.deleteOne({_id});
            await O_Auth.deleteMany({user_id: _id});

            res.sendStatus(statusCodeResponse.NO_DATA);
        } catch (e) {
            next(e);
        }
    },

    follow: async (req, res, next) => {
        try {

            const {id} = req.body;

            const {user_id} = req.params;
            const user = await User.findById(user_id);

            await user.updateOne({$push: {followers: id}});
            await req.body.updateOne({$push: {followings: user_id}});

            res.status(200).json('user has been followed');
        } catch (e) {
            next(e);
        }
    },

    unfollow: async (req, res, next) => {
        try {

            const {_id} = req.body;

            const {user_id} = req.params;
            const user = await User.findById(user_id);

            await user.updateOne({$pull: {followers: _id}});
            await req.body.updateOne({$pull: {followings: user_id}});

            res.status(200).json('user has been unfollowed');
        } catch (e) {
            next(e);
        }
    }
};

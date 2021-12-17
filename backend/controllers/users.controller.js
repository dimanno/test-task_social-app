const {User} = require('../models');
const {O_Auth} = require('../models');
// const {emailService: {sendEmail}} = require('../services');
const {userNormalize} = require('../handler');
const {statusCodeResponse} = require('../constants');
// const {emailAction} = require('../constants');

module.exports = {

    addUser: async (req, res, next) => {
        try {

            const newUser = await User.createUserWithHashPassword(req.body);
            const userNormalise = userNormalize(newUser.toJSON());

            // await sendEmail(newUser.email, emailAction.WELCOME, {userName: newUser.name});

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
            console.log(_id);
            await User.deleteOne({_id});
            await O_Auth.deleteMany({user_id: _id});

            res.sendStatus(statusCodeResponse.NO_DATA);
        } catch (e) {
            next(e);
        }
    },

    follow: async (req, res, next) => {
        try {

            const {_id} = req.body;

            const {user_id} = req.params;
            const user = await User.findById(user_id);

            await user.updateOne({$push: {followers: _id}});
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

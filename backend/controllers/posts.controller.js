const {Post} = require('../models');
const {statusCodeResponse} = require('../constants');

module.exports = {
    addPost: async (req, res, next) => {
        try {
            const {user_id:{_id}} = req.user;
            const post = await Post.create({...req.body, user_id: _id});

            res.status(statusCodeResponse.CREATED).json(post);
        } catch (e) {
            next(e);
        }
    },

    getAllPosts: async (req, res, next) => {
        try {
            const posts = await Post.find({}).lean();

            res.json(posts);
        } catch (e) {
            next(e);
        }
    },

    getPostById: (req, res, next) => {
        try {
            const post = req.post;

            res.json(post);
        } catch (e) {
            next(e);
        }
    },

    getPostsByUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const userPosts = await Post.find({user_id}).lean();

            res.json(userPosts);
        } catch (e) {
            next(e);
        }
    },

    updatePost: async (req, res, next) => {
        try {
            const {post_id} = req.params;
            const post = req.body;
            const postUpdated = await Post.updateData(post_id,
                post, {new: true});

            res.json(postUpdated);
        } catch (e) {
            next(e);
        }
    },

    deletePost:async (req, res, next) => {
        try {
            const {post_id} = req.params;
            await Post.findByIdAndDelete(post_id);

            res.sendStatus(statusCodeResponse.NO_DATA);
        } catch (e) {
            next(e);
        }
    },
};

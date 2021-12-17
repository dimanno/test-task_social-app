const {Comment, Post} = require('../models');
const {statusCodeResponse} = require('../constants');

module.exports = {
    addComment: async (req, res, next) => {
        try {
            const {post_id: id} = req.params;

            const comment = await Comment.create({...req.body, post_id: id});

            await Post.findByIdAndUpdate(id, {$push: {comments: comment}});

            res.status(statusCodeResponse.CREATED).json(comment);
        } catch (e) {
            next(e);
        }
    },
    getAllComments: (req, res, next) => {
        try {
            const comments = req.body;
            res.json(comments);
        } catch (e) {
            next(e);
        }
    },
    updateComment: async (req, res, next) => {
        try {
            const comment = req.body;
            const {comment_id} = req.params;

            const commentUpdated = await Comment.updateData(comment_id, comment, {new: true});

            res.json(commentUpdated);
        } catch (e) {
            next(e);
        }
    },
    deleteComment: async (req, res, next) => {
        try {
            const {comment_id} = req.params;
            await Comment.deleteOne({_id: comment_id});

            res.json(statusCodeResponse.NO_DATA);
        } catch (e) {
            next(e);
        }
    },
    getCommentsToPost: async (req, res, next) => {
        try {
            const {post_id} = req.params;
            const commentsOnPost = await Comment.find({post_id}).lean();

            res.json(commentsOnPost);
        } catch (e) {
            next(e);
        }
    }
};

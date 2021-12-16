const {Comment} = require('../models');
const {statusCodeResponse} = require('../constants');

module.exports = {
    addComment: async (req, res, next) => {
        try {
            const {post_id: id} = req.params;
            console.log(id);
            const comment = await Comment.create({...req.body, post_id: id});

            res.status(statusCodeResponse.CREATED).json(comment);
        } catch (e) {
            next(e);
        }
    },
    getAllComments: (req, res, next) => {
        try {

        } catch (e) {
            next(e);
        }
    },
    updateComment: async (req, res, next) => {
        try {
            const comment = req.body;
            await Comment.create(comment);
        } catch (e) {
            next(e);
        }
    },
    deleteComment: async (req, res, next) => {
        try {
            const comment = req.body;
            await Comment.create(comment);
        } catch (e) {
            next(e);
        }
    },
    getCommentsToPost: (req, res, next) => {
        try {

        } catch (e) {
            next(e);
        }
    }

};

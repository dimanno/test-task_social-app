const {Comment} = require('../models');

module.exports = {
    addComment: async (req, res, next) => {
        try {
            const comment = req.body;
            await Comment.create(comment);
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

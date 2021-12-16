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
    getComments: (req, res, next) => {
        try {

        } catch (e) {
            next(e);
        }
    }
};

const router = require('express').Router();

const {commentsController} = require('../controllers');
const {commentMiddleware} = require('../middlewares');

router.get('/', commentMiddleware.isCommentsExist, commentsController.getAllComments);

router.put('/:comment_id', commentMiddleware.isCommentExist, commentsController.updateComment);
router.delete('/:comment_id', commentMiddleware.isCommentExist, commentsController.deleteComment);

module.exports = router;

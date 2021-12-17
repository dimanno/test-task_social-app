const router = require('express').Router();

const {commentsController} = require('../controllers');
const {commentMiddleware} = require('../middlewares');

router.get('/', commentMiddleware.isCommentsExist, commentsController.getAllComments);

router.get('/:comment_id', commentsController.getCommentsToPost);
router.put('/:comment_id', commentsController.updateComment);
router.delete('/:comment_id', commentsController.deleteComment);

module.exports = router;

const router = require('express').Router();

const {commentsController} = require('../controllers');

router.get('/', commentsController.getAllComments);

router.get('/:comment_id', commentsController.getCommentsToPost);
router.put('/:comment_id', commentsController.updateComment);
router.delete('/:comment_id', commentsController.deleteComment);

module.exports = router;

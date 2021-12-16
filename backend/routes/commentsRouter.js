const router = require('express').Router();

const {commentsController} = require('../controllers');
const {universalMiddlewares} = require('../middlewares');
const {commentValidator} = require('../validators');

router.post('/',
    universalMiddlewares.checkValidDataMiddleware(commentValidator),
    commentsController.addComment);
router.get('/', commentsController.getAllComments);

router.get('/:comment_id', commentsController.getCommentsToPost);
router.put('/:comment_id', commentsController.updateComment);
router.delete('/:comment_id', commentsController.deleteComment);

module.exports = router;

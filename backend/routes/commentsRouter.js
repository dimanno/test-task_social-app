const router = require('express').Router();

const {commentsController} = require('../controllers');
const {commentMiddleware, usersMiddlewares} = require('../middlewares');
const {ADMIN} = require('../constants/userRoles.enum');

router.get('/',
    commentMiddleware.isCommentsExist,
    commentsController.getAllComments);

router.use(usersMiddlewares.checkUserRole(ADMIN));

router.put('/:comment_id', commentMiddleware.isCommentExist, commentsController.updateComment);
router.delete('/:comment_id', commentMiddleware.isCommentExist, commentsController.deleteComment);

module.exports = router;

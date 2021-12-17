const router = require('express').Router();

const {postsController, commentsController} = require('../controllers');
const {authMiddlewares, universalMiddlewares, postMiddlewares} = require('../middlewares');
const {ACCESS} = require('../constants/tokens.type.enum');
const {postValidators, commentValidators} = require('../validators');

router.get('/', postsController.getAllPosts);

router.get('/:post_id', postMiddlewares.checkPostExist, postsController.getPostById);

router.get('/:post_id/comments',
    postMiddlewares.checkPostExist,
    commentsController.getCommentsToPost);
router.post('/:post_id/comments',
    universalMiddlewares.checkValidDataMiddleware(commentValidators.commentValidator),
    commentsController.addComment);

router.use(authMiddlewares.checkToken(ACCESS));

router.post('/',
    universalMiddlewares.checkValidDataMiddleware(postValidators.addPostValidator),
    postsController.addPost);

router.put('/:post_id',
    postMiddlewares.checkUserPost,
    postsController.updatePost);
router.delete('/:post_id', postMiddlewares.checkUserPost, postsController.deletePost);

module.exports = router;

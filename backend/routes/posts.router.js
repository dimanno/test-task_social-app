const router = require('express').Router();

const {postsController, commentsController} = require('../controllers');
const {authMiddlewares, universalMiddlewares, postMiddlewares} = require('../middlewares');
const {ACCESS} = require('../constants/tokens.type.auth');
const {postValidators, commentValidators} = require('../validators');

router.get('/', postsController.getAllPosts);
router.post('/',
    authMiddlewares.checkToken(ACCESS),
    universalMiddlewares.checkValidDataMiddleware(postValidators.addPostValidator),
    postsController.addPost);

router.get('/:post_id', postMiddlewares.checkPostExist, postsController.getPostById);
router.put('/:post_id',
    authMiddlewares.checkToken(ACCESS),
    postMiddlewares.checkUserPost,
    postsController.updatePost);
router.delete('/:post_id',
    authMiddlewares.checkToken(ACCESS),
    postMiddlewares.checkUserPost,
    postsController.deletePost);


router.get('/:post_id/comments',
    postMiddlewares.checkPostExist,
    commentsController.getCommentsToPost);
router.put('/:post_id/comments',
    postMiddlewares.checkPostExist,
    universalMiddlewares.checkValidDataMiddleware(commentValidators.commentValidator),
    commentsController.addComment);

module.exports = router;

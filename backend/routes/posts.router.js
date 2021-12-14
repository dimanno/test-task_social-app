const router = require('express').Router();

const {postsController} = require('../controllers');
const {authMiddlewares, universalMiddlewares, postMiddlewares, usersMiddlewares} = require('../middlewares');
const {ACCESS} = require('../constants/tokens.type.enum');
const {postValidators:{addPost_validator}} = require('../validators');

router.get('/', postsController.getAllPosts);
router.get('/:user_id', usersMiddlewares.checkUserById, postsController.getPostsByUser);
router.get('/:user_id/:post_id',
    postMiddlewares.checkPostExist,
    postsController.getPostById);

router.use(authMiddlewares.checkToken(ACCESS));
router.post('/',
    universalMiddlewares.checkValidDataMiddleware(addPost_validator),
    postsController.addPost);
router.put('/:_id', postMiddlewares.checkUserPost, postsController.updatePost);
router.delete('/:_id', postMiddlewares.checkUserPost, postsController.deletePost);

module.exports = router;

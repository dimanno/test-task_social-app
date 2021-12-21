const router = require('express').Router();

const {authController} = require('../controllers');
const {authMiddlewares, universalMiddlewares, usersMiddlewares} = require('../middlewares');
const {authValidators:{authValidator}} = require('../validators');
const {REFRESH, ACCESS} = require('../constants/tokens.type.auth');

router.post('/', universalMiddlewares.checkValidDataMiddleware(authValidator),
    usersMiddlewares.isUserPresent,
    authMiddlewares.checkPasswordMatched,
    authController.login );

router.post('/refresh', authMiddlewares.checkToken(REFRESH), authController.updateRefreshToken);
router.post('/logout', authMiddlewares.checkToken(ACCESS), authController.logout);
router.post('/logout_all', authMiddlewares.checkToken(ACCESS), authController.logoutAll);

module.exports = router;

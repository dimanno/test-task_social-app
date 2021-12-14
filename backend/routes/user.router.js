const router = require('express').Router();

const {usersController} = require('../controllers');
const {usersMiddlewares, universalMiddlewares, authMiddlewares} = require('../middlewares');
const {userValidators:{addUser_validator, updateUserValidator}} = require("../validators");
const {tokenTypeEnum} = require("../constants");

router.post('/',
    universalMiddlewares.checkValidDataMiddleware(addUser_validator),
    usersMiddlewares.checkEmailExist,
    usersController.addUser);
router.get('/', usersController.getUsers);

router.get('/:user_id', usersMiddlewares.checkUserById,usersController.getUserById);

router.use(authMiddlewares.checkToken(tokenTypeEnum.ACCESS));
router.put('/:user_id',
    universalMiddlewares.checkValidDataMiddleware(updateUserValidator),
    usersMiddlewares.checkUserById,
    usersController.updateUser);
router.delete('/:user_id', usersMiddlewares.checkUserById,usersController.deleteUser)
module.exports = router;

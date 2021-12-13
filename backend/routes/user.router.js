const router = require('express').Router();

const {usersController} = require('../controllers')

router.post('/', usersController.addUser);

module.exports = router;

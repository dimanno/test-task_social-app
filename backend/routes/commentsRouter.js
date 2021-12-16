const router = require('express').Router();

const {commentsController} = require('../controllers');

router.post('/', commentsController.addComment);

module.exports = router;

const express = require('express');
const loginUserController = require('../controllers/loginUser-controller');
const router = express.Router();

router.post('/login',loginUserController.getLoginUser);

module.exports = router;
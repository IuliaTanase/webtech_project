const express = require('express')
const router = express.Router();
const friendController = require('../controllers/friend-controller');

router.get('/:uid/friends', friendController.getAllFriends);
router.post('/:uid/friends', friendController.addFriend);

module.exports = router;
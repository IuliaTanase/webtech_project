const express = require('express')
const router = express.Router();
const friendController = require('../controllers/friend-controller');

router.get('/:uid/friends', friendController.getAllFriends);
router.post('/:uid/friends', friendController.addFriend);
router.get('/:uid/friends/:usernameFriend/aliments',friendController.getFriendAliments)

module.exports = router;
const express = require('express');
const userAlimentController = require('../controllers/userAliment-controller');
const router = express.Router();

router.get('/:uid/aliments', userAlimentController.getUserAliments);
router.post('/:uid/aliments', userAlimentController.createUserAliment);
router.get('/:uid/aliments/:aid', userAlimentController.getUserAliment);
router.put('/:uid/aliments/:aid', userAlimentController.updateUserAliment);
router.delete('/:uid/aliments/:aid', userAlimentController.deleteUserAliment);

module.exports = router;
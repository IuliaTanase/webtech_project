const express = require('express');
const alimentController = require('../controllers/aliment-controller');
const router = express.Router();

router.get('/', alimentController.getAliments);
router.post('/', alimentController.createAliment);
router.get('/:aid', alimentController.getAliment);
router.put('/:aid', alimentController.updateAliment);
router.delete('/:aid', alimentController.deleteAliment);

module.exports = router;
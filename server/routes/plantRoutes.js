const express = require('express');
const router = express.Router();
const { getPlants, createPlant } = require('../controllers/plantController');

router.get('/', getPlants);
router.post('/', createPlant);

module.exports = router;

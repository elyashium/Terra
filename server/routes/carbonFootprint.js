const express = require('express');
const router = express.Router();
const {
  getCarbonFootprints,
  getCarbonFootprint,
  createCarbonFootprint,
  updateCarbonFootprint,
  deleteCarbonFootprint
} = require('../controllers/carbonFootprint');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getCarbonFootprints)
  .post(protect, createCarbonFootprint);

router.route('/:id')
  .get(protect, getCarbonFootprint)
  .put(protect, updateCarbonFootprint)
  .delete(protect, deleteCarbonFootprint);

module.exports = router; 
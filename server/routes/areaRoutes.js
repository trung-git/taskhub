const express = require('express');
const router = express.Router();
const areaController = require('./../controllers/areaController');
const { protect } = require('../controllers/authController');

router
  .route('/city')
  .get(areaController.getCities)
  .post(protect, areaController.createCity);

router
  .route('/district')
  .get(areaController.getDistricts)
  .post(protect, areaController.createDistrict);

router.get('/districts-by-city', areaController.getDistrictsByCity)
module.exports = router;

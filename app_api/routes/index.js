const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

router
  .route('/trips')
  .get(tripsController.tripsList);

router
  .route('/trips/:tripCode')
  .get(tripsController.tripFindByCode)
  .post(tripsController.tripsAddTrip);

module.exports = router;
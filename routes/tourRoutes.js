const express = require('express');
const tourcontroller = require('./../controlers/tourcontrollers');
const router = express.Router();

// router.param( 'id', tourcontroller.param
// );

//  a middle ware that checKTour
// for name and price property
// send 404 if doesnt gets both
// this middle ware is added to post method of
//NOTE - middle ware to create an alias for top 5 cheap tours

router
  .route('/top-5-cheap')
  .get(tourcontroller.getTopCheapTours, tourcontroller.getAllTours);
//
router.route('/').get(tourcontroller.getAllTours).post(tourcontroller.addTour);
router
  .route('/:id')
  .delete(tourcontroller.deleteTourById)
  .get(tourcontroller.getTourById)
  .patch(tourcontroller.updateTourById);
module.exports = router;

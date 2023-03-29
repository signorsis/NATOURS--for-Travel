
const express = require('express');
const tourcontroller = require('./../controlers/tourcontrollers');
const router=express.Router();

router.param( 'id', tourcontroller.param
);

//  a middle ware that checKTour 
// for name and price property
// send 404 if doesnt gets both
// this middle ware is added to post method of
router
.route('/')
.get(tourcontroller.getAllTours)
.post(tourcontroller.checkTour, tourcontroller.addTour);
router
.route('/:id')
.delete(tourcontroller.deleteTourById)
.get(tourcontroller.getTourById);

module.exports=router;
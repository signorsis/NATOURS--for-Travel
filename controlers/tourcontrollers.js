const fs = require('fs');
const express = require('express');
const Tour = require('../models/tourModel');
const { Query } = require('mongoose');
const APIFeatures=require('../utils/apiFeatures')
//NOTE - middleware controller
exports.getTopCheapTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage price';
  req.query.fields = 'name ratingsAverage price';
  next();
};

const regexp = new RegExp(/\b(?<!\.)\d+(?!\.)\b/);
// route handlers or controllers

exports.getAllTours = async (req, res) => {
  try {
       //NOTE EXECUTE QUERY
    const apiFeature = new APIFeatures(Tour.find(), req.query)
      .filter()
      .limitFields()
      .sort()
      .paginate();
    const tours = await apiFeature.query;
    res.status(200).json({
      status: 'successful',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};
exports.getTourById = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id);

    res.status(200).json({ message: 'successful', data: tour });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};
exports.addTour = (req, res) => {
  const newTour = Tour(req.body);

  newTour
    .save()
    .then((doc) => {
      res.status(201).json({
        status: 'successful',
        data: {
          tours: doc,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: 'error',
        message: err,
      });
    });
};

exports.deleteTourById = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(204).json({
      status: 'successful',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'err',
    });
  }
};

exports.updateTourById = (req, res) => {
  Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((tour) => {
      res.status(201).json({
        status: 'successfuly updated tour by id',
        data: { tour },
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: 'error',
      });
    });
};

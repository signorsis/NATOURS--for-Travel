const fs = require('fs');
const express = require('express');
const Tour = require('../models/tourModel');

const regexp = new RegExp(/\b(?<!\.)\d+(?!\.)\b/);
// route handlers or controllers

exports.getAllTours = (req, res) => {
  Tour.find()
    .then((tours) =>
      res.status(200).json({
        status: 'successful',
        data: {
          tours,
        },
      })
    )
    .catch((err) =>
      res.status(404).json({
        status: 'error',
        message: err,
      })
    );
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

exports.deleteTourById = (req, res) => {
  const id = +req.params.id;

  res.status(204).json({
    status: 'successful',
    data: null,
  });
};

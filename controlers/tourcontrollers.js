const fs = require('fs');
const express = require('express');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);
const regexp = new RegExp(/\b(?<!\.)\d+(?!\.)\b/);
// route handlers or controllers
exports.param = (req, res, next, val) => {
  val = +val;
  let tourIfFound={};
   tourIfFound = tours.find((x) => x.id === val);
  
  if (!regexp.test(val) || val < 0 || tourIfFound===undefined) {
    return res.status(404).send(' incorrect id');
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'successful',
    data: {
      tours: tours,
    },
  });
};
exports.getTourById = (req, res) => {
  const id = +req.params.id;
  const newTour = tours.find((x) => x.id === id);
  
  res.status(200).json({ message: 'successful', data: newTour });
};
exports.addTour = (req, res) => {
  const addedTourId = tours[tours.length - 1].id + 1;
  
  const newTour = { id: addedTourId, ...req.body };

  const newTours = [...tours, newTour];

  const JSONnewTours = JSON.stringify(newTours);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSONnewTours,
    (err) => {
      if (err) console.log('error writing file');
      res.status(200).send('Successful');
    }
  );
};

exports.deleteTourById = (req, res) => {
  const id = +req.params.id;

  res.status(204).json({
    status: 'successful',
    data: null,
  });
};
exports.checkTour= (req,res,next) =>{
 const content= req.body;
if(!content.name || !content.price)
{
return (res.status(404).send({
  message: "Fail, name or price keys not found in request",
}));
}
 next();
}

//using mongoose to solve
const dotenv = require('dotenv');
dotenv.config({ path: './../config.env' });
const mongoose = require('mongoose');

const Tour = require('../models/tourModel');


const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then((doc) => console.log('db connected'))
  .catch((err) => console.log(err));

const fs = require('fs');

const data = fs.readFileSync('./../dev-data/data/tours-simple.json');
const StringData = JSON.parse(data);

const importData = () => {
  Tour.create(StringData)
    .then((data) => {
      console.log('succesfully imported data');
     process.exit();     
    })
    .catch((err) => console.log(err));
};
const deleteData = () => {
  Tour.deleteMany()
    .then((json) => {console.log('succesfully Deleted'); process.exit();})
    .catch((err) => {console.log(err);process.exit();});
    
};

if( process.argv[2]==="--import")
{
    importData();
}

else if(process.argv[2]==="--delete")
{
    deleteData();
}

// // create a fetch method for a post request with the url to add a tour
// const getTours = async (tour) => {
//   try {
//     const response = await fetch('http://localhost:3000/api/v1/tours', {
//       method: 'POST',
//       body:
//         JSON.stringify(tour)  // the body type should match the header so we convert the data to Json
//       ,
//       headers: {
//         'content-type': 'application/json',
//       },
//     });
//     const json = await response.json();

//     console.log(json);
//   } catch (err) {
//     console.log(err);
//   }
// };

// for(let i=0;i<StringData.length;i++){
// getTours(StringData[i]);}

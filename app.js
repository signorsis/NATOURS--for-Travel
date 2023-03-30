const express = require('express');
const app = express();
//routes
const usersRouter = require('./routes/userRoutes');
const toursRouter = require('./routes/tourRoutes');

const morgan = require('morgan');
app.use(express.json()); //known as body parser of the request, a middleware

if (process.env.NODE_ENV==='development')

{  app.use(morgan())}
// serving static file is done from files without using routes
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', toursRouter);

app.use('/api/v1/users', usersRouter);


module.exports = app;



// const options = {
//     method: 'GET',
//     url: 'https://livescore6.p.rapidapi.com/matches/v2/list-live',
//     // params: {Category: 'soccer', Timezone: '-7'},
//     headers: {
//       'X-RapidAPI-Key': 'e172b99882msh576c12a737c9e3bp1699b8jsnf05a40d63746',
//       'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
//     }
//   };
//  let data= {};
//   axios.request(options).then(function (response) {
//     data=response.data.stages[0].;
//     console.log(response.data);  
//     //response.status(200).json( { message: "successful", data: response.data})
//   }).catch(function (error) {
//       console.error(error);
//   });
//   app.get('/', (req,res)=>{
//     res.send(data);
//   })
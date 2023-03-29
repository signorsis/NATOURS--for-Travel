const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config( {path : "./config.env"})// this add the config.env variables to the eviroment
const app = require('./app');
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology: true ,
useFindAndModify: false,  
}).then((con)=>{ console.log(con.connections);
                  console.log('DB connectiion succesful'); })


port=process.env.PORT || 3000 
app.listen(process.env.port, () => {
  console.log(`App running on port ${port}...`);
});

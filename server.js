
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); // this add the config.env variables to the eviroment
const app = require('./app');


port =  3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }) 
  .then((con) => {
    
    console.log('DB connectiion successful');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'tour name is required'],
    unique: true,
  },
  price: { type: Number, required: true },
  rating: { type: Number, default: 4.3 },
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports=Tour;
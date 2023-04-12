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
  duration: { type: Number, required: [true, ' Tour duration is required'] },
  maxGroupSize: {
    type: Number,
    required: [true, ' Maximum Number of Tour members is required'],
  },
  difficulty: { type: String, required: true },
  summary: { type: String, trim: true, required: true },
  description: { type: String, trim: true },
 
  ratingsAverage: { type: Number, default: 4.5 },
  ratingsQuantity: { type: Number, default: 0 },
  priceDiscount: Number,
  startDates: [Date],
  imageCover: { type: String, required: true },
  images: [String],
  createdAt: { type: Date,
          default: Date.now, 
          Select:false, },
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

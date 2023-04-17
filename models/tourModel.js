const mongoose = require('mongoose');
const slugify = require('slugify');
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

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'tour name is required'],
      unique: true,
    },
    slug: String,
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
    createdAt: { type: Date, default: Date.now, Select: false },
    secretTour: {type: Boolean, default: false}
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//NOTE - this is a virtual field which does not exist in the database
//       it is generated for every document though.
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//NOTE this is a pre-save document middleware executed before saveing or creating
//     or creating a document
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//NOTE -  this is query middle ware.
//        this query executes for middlewares beginning with
//         find 
tourSchema.pre(/^find/, function (next) {
  this.find( {secretTour : { $ne: true}});
  this.start=Date.now();
  next();
});

tourSchema.post(/^find/, function (next) {
  console.log(`${Date.now() -this.start} miliseconds` );
  next();
})


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

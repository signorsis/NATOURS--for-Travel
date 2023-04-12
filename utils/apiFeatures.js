class APIFeatures {
    //NOTE - query is the mongoose query while queryString is the req.qwuery
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      // 1A) filtering
      const queryObj = { ...this.queryString };
      const excludedFields = ['sort', 'page', 'limit', 'fields'];
      excludedFields.forEach((exFil) => delete queryObj[exFil]);
  
      // 2B) Advanced Filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
  
      return this;
    }
    sort() {
      if (this.queryString.sort) {
        // sort(price ratingsAverage ), "sort " method recives multiple parameters split
        // with white space, query string in the url contains comma separated parameters
        // so chance the ","  with " "
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('__createdAt');
      }
      return this;
    }
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v -_id');
      }
      return this;
    }
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }

  module.exports=APIFeatures;
  